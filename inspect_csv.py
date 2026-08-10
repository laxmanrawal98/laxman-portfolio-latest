import csv

path = r"C:\Users\Swaroop\Downloads\CV Projects  - Projects - Scalify With AI.csv"
with open(path, newline="", encoding="utf-8-sig") as f:
    rows = list(csv.reader(f))

print("Total rows:", len(rows))
print("Max cols:", max(len(r) for r in rows))

# Find project headers in row 0
for i, cell in enumerate(rows[0]):
    if cell.strip():
        print(f"Col {i}: {cell[:80]!r}")

print("\n--- Row 3 (headers) ---")
for i, cell in enumerate(rows[3] if len(rows) > 3 else []):
    if cell.strip():
        print(f"Col {i}: {cell[:80]!r}")

print("\n--- Row 4 (Company Brief labels) ---")
for i, cell in enumerate(rows[4] if len(rows) > 4 else []):
    if cell.strip():
        print(f"Col {i}: {cell[:80]!r}")

print("\n--- Row 5 (brief content sample) ---")
for i, cell in enumerate(rows[5] if len(rows) > 5 else []):
    if cell.strip():
        print(f"Col {i}: {cell[:120]!r}")
