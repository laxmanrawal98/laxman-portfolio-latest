import csv
import sys
sys.stdout.reconfigure(encoding="utf-8")

path = r"C:\Users\Swaroop\Downloads\CV Projects  - Projects - Scalify With AI.csv"
with open(path, newline="", encoding="utf-8-sig") as f:
    rows = list(csv.reader(f))

PROJECTS = {
    "upscape": {"label": 8, "content": 10},
    "residency": {"label": 17, "content": 19},
    "srieye": {"label": 26, "content": 27},
    "realestate": {"label": 34, "content": 35},
    "solar": {"label": 43, "content": 44},
}

for name, cols in PROJECTS.items():
    print(f"\n=== {name} ===")
    for r in range(len(rows)):
        lab = rows[r][cols["label"]].strip() if cols["label"] < len(rows[r]) else ""
        con = rows[r][cols["content"]].strip() if cols["content"] < len(rows[r]) else ""
        if lab or con:
            print(f"R{r:02d} L:{lab[:40]!r} | C:{con[:80]!r}")
