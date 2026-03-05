"""
Cohort Analyser — Dataset Preprocessing Script

Transforms raw Kaggle/UCI datasets into clean JSON for the app.

PREREQUISITES:
1. pip install pandas openpyxl

2. Download raw data:
   a) UCI Online Retail II:
      https://archive.ics.uci.edu/static/public/502/online+retail+ii.zip
      → Extract online_retail_II.xlsx to raw-data/

   b) H&M Transactions:
      https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations/data
      → Download transactions_train.csv to raw-data/

3. Run: python scripts/prepare-datasets.py

OUTPUT: public/data/{ecommerce,hm-fashion,declining-product}.json
"""

import json
import os
import sys
import random
from pathlib import Path

import pandas as pd
import numpy as np

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
RAW_DIR = PROJECT_DIR / "raw-data"
OUT_DIR = PROJECT_DIR / "public" / "data"
OUT_DIR.mkdir(parents=True, exist_ok=True)

random.seed(42)
np.random.seed(42)


def process_uci_online_retail():
    """
    Dataset 1: UCI Online Retail II → Healthy E-commerce
    Source: https://archive.ics.uci.edu/dataset/502/online+retail+ii
    License: CC BY 4.0
    """
    filepath = RAW_DIR / "online_retail_II.xlsx"
    if not filepath.exists():
        print(f"⚠  Skipping UCI Online Retail II — file not found: {filepath}")
        print(f"   Download from: https://archive.ics.uci.edu/static/public/502/online+retail+ii.zip")
        return

    print("Processing UCI Online Retail II...")

    # Read both sheets (Year 2009-2010 and Year 2010-2011)
    df1 = pd.read_excel(filepath, sheet_name="Year 2009-2010")
    df2 = pd.read_excel(filepath, sheet_name="Year 2010-2011")
    df = pd.concat([df1, df2], ignore_index=True)

    print(f"  Raw rows: {len(df):,}")

    # Clean: remove rows with missing CustomerID, negative quantities/prices (returns)
    df = df.dropna(subset=["Customer ID"])
    df = df[df["Quantity"] > 0]
    df = df[df["Price"] > 0]

    # Calculate revenue per line item
    df["revenue"] = (df["Quantity"] * df["Price"]).round(2)

    # Convert CustomerID to string
    df["Customer ID"] = df["Customer ID"].astype(int).astype(str)

    # Extract date (YYYY-MM-DD)
    df["date"] = pd.to_datetime(df["InvoiceDate"]).dt.strftime("%Y-%m-%d")

    # Aggregate: one row per user per day, sum revenue
    daily = (
        df.groupby(["Customer ID", "date"])
        .agg(revenue=("revenue", "sum"))
        .reset_index()
    )
    daily["revenue"] = daily["revenue"].round(2)

    # Sort by date
    daily = daily.sort_values("date").reset_index(drop=True)

    # Build events list (vectorized — avoids slow iterrows on large DataFrames)
    daily = daily.rename(columns={"Customer ID": "userId"})
    events = daily[["userId", "date", "revenue"]].to_dict("records")

    unique_users = daily["userId"].nunique()
    date_range = {"start": daily["date"].min(), "end": daily["date"].max()}

    dataset = {
        "id": "ecommerce",
        "name": "E-commerce Store",
        "description": "Derived from a sample of the UCI Online Retail II dataset (CC BY 4.0). A UK-based online retail business selling gift-ware. Shows healthy growth patterns with strong retention floor and revenue expansion from loyal customers. Data has been aggregated and sampled for educational purposes.",
        "archetype": "healthy",
        "events": events,
        "meta": {
            "totalUsers": unique_users,
            "totalEvents": len(events),
            "dateRange": date_range,
            "hasRevenue": True,
        },
    }

    outpath = OUT_DIR / "ecommerce.json"
    with open(outpath, "w") as f:
        json.dump(dataset, f, separators=(",", ":"))

    size_mb = outpath.stat().st_size / (1024 * 1024)
    print(f"  ✓ {unique_users:,} users, {len(events):,} events → {outpath} ({size_mb:.1f} MB)")


def process_hm_transactions():
    """
    Dataset 2: H&M Fashion Transactions → Power-Law Engagement
    Source: https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations
    License: Kaggle Competition (research/educational use)
    """
    filepath = RAW_DIR / "transactions_train.csv"
    if not filepath.exists():
        print(f"⚠  Skipping H&M Fashion — file not found: {filepath}")
        print(f"   Download from: https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations/data")
        return

    print("Processing H&M Fashion Transactions...")

    # Read CSV
    df = pd.read_csv(filepath, dtype={"customer_id": str, "article_id": str})
    print(f"  Raw rows: {len(df):,}")

    # Parse date
    df["date"] = pd.to_datetime(df["t_dat"]).dt.strftime("%Y-%m-%d")

    # Convert price to revenue (price is in SEK, normalize to USD-ish scale)
    # H&M prices are already reasonable values
    df["revenue"] = (df["price"] * 100).round(2)  # Scale up from fractional to whole numbers

    # Process all customers (pre-computation handles the heavy analytics at build time)
    all_customers = df["customer_id"].unique()
    print(f"  Total customers: {len(all_customers):,}")

    # Aggregate: one row per user per day, sum revenue
    daily = (
        df.groupby(["customer_id", "date"])
        .agg(revenue=("revenue", "sum"))
        .reset_index()
    )
    daily["revenue"] = daily["revenue"].round(2)
    daily = daily.sort_values("date").reset_index(drop=True)

    # Anonymize customer IDs (hash to shorter strings)
    id_map = {cid: f"h{i}" for i, cid in enumerate(sorted(daily["customer_id"].unique()))}
    daily["customer_id"] = daily["customer_id"].map(id_map)

    # Build events list (vectorized — avoids slow iterrows on 31M+ rows)
    daily = daily.rename(columns={"customer_id": "userId"})
    events = daily[["userId", "date", "revenue"]].to_dict("records")

    unique_users = daily["userId"].nunique()
    date_range = {"start": daily["date"].min(), "end": daily["date"].max()}

    dataset = {
        "id": "hm-fashion",
        "name": "Fashion Retail",
        "description": "Derived from the H&M Personalized Fashion Recommendations dataset (Kaggle). Demonstrates classic power-law engagement: most customers buy once or twice, but a small core drives disproportionate revenue. Aggregated for educational purposes.",
        "archetype": "power-law",
        "events": events,
        "meta": {
            "totalUsers": unique_users,
            "totalEvents": len(events),
            "dateRange": date_range,
            "hasRevenue": True,
        },
    }

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    outpath = RAW_DIR / "hm-fashion.json"
    with open(outpath, "w") as f:
        json.dump(dataset, f, separators=(",", ":"))

    size_mb = outpath.stat().st_size / (1024 * 1024)
    print(f"  ✓ {unique_users:,} users, {len(events):,} events → {outpath} ({size_mb:.1f} MB)")
    print(f"  Note: Run 'npm run precompute' to generate the compact .computed.json for the browser")


def generate_declining_product():
    """
    Dataset 3: Synthetic Declining Product
    A SaaS product losing product-market fit.
    """
    print("Generating Declining Product (synthetic)...")

    rng = np.random.RandomState(789)
    events = []
    start_year, start_month = 2022, 7
    months = 20
    next_user_id = 1
    all_user_ids = set()

    for m in range(months):
        year = start_year + (start_month + m - 1) // 12
        month = (start_month + m - 1) % 12 + 1
        days_in_month = pd.Timestamp(year, month, 1).days_in_month

        # Declining acquisition: starts at 300, drops to ~30
        new_users = max(20, int(300 - m * 14 + rng.randint(-10, 10)))

        # Cohort quality deteriorates over time
        cohort_decay = max(0.4, 1 - m * 0.03)

        for _ in range(new_users):
            uid = f"d{next_user_id}"
            next_user_id += 1
            all_user_ids.add(uid)

            # First month: 1-2 active days
            active_days_m0 = 1 + rng.randint(0, 2)
            used_days = set()
            for _ in range(active_days_m0):
                day = rng.randint(1, days_in_month + 1)
                if day not in used_days:
                    used_days.add(day)
                    date = f"{year:04d}-{month:02d}-{day:02d}"
                    rev = round(10 + rng.random() * 40, 2)
                    events.append({"userId": uid, "date": date, "revenue": rev})

            # Subsequent months: retention that never stabilizes (leaky bucket)
            for n in range(1, months - m):
                # No retention floor — keeps declining
                ret_prob = max(0.02, (0.35 / (n ** 0.7)) * cohort_decay)

                if rng.random() < ret_prob:
                    fut_year = start_year + (start_month + m + n - 1) // 12
                    fut_month = (start_month + m + n - 1) % 12 + 1
                    fut_days = pd.Timestamp(fut_year, fut_month, 1).days_in_month
                    day = rng.randint(1, fut_days + 1)
                    date = f"{fut_year:04d}-{fut_month:02d}-{day:02d}"
                    # Revenue contracts over time
                    rev_mult = max(0.5, 1 - n * 0.05)
                    rev = round((10 + rng.random() * 40) * rev_mult, 2)
                    events.append({"userId": uid, "date": date, "revenue": rev})

    # Sort by date
    events.sort(key=lambda e: e["date"])

    dates = [e["date"] for e in events]
    dataset = {
        "id": "declining-product",
        "name": "Declining SaaS Product",
        "description": "Synthetic dataset simulating a B2B SaaS tool losing product-market fit. Falling acquisition, leaky bucket retention, and contracting revenue. Generated for educational purposes to illustrate declining growth patterns.",
        "archetype": "declining",
        "events": events,
        "meta": {
            "totalUsers": len(all_user_ids),
            "totalEvents": len(events),
            "dateRange": {"start": min(dates), "end": max(dates)},
            "hasRevenue": True,
        },
    }

    outpath = OUT_DIR / "declining-product.json"
    with open(outpath, "w") as f:
        json.dump(dataset, f, separators=(",", ":"))

    size_mb = outpath.stat().st_size / (1024 * 1024)
    print(f"  ✓ {len(all_user_ids):,} users, {len(events):,} events → {outpath} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    print("=" * 60)
    print("Cohort Analyser — Dataset Preprocessing")
    print("=" * 60)
    print()

    process_uci_online_retail()
    print()
    process_hm_transactions()
    print()
    generate_declining_product()

    print()
    print("=" * 60)
    print("Done! JSON files are in public/data/")
    print("=" * 60)
