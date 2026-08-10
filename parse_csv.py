import csv
import json
import re
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

SECTION_LABELS = {
    "Company Brief": "brief",
    "Problem Statement": "problems",
    "Problem Statment": "problems",
    "Problem": "problems",
    "Solution": "solutions",
    "Solutions": "solutions",
    "Impact": "impact",
}

SKIP_CONTENT = {
    "💡 Solutions Built",
    "🎯 Impact & Business Outcomes",
    "Summary Impact Table",
    "Impact Area",
    "Operational Area",
    "Metric",
    "Before System",
    "After System",
    "Net Outcome",
    "Before Platform",
    "After Platform",
    "Before Automation",
    "After Automation",
}

IMPACT_GROUP_HEADERS = {
    "1. Revenue & Cash-Flow Impact",
    "2. Time & Operational Impact",
    "3. Cost & Budget Optimization",
    "4. Efficiency & Governance",
}


def get_cell(r, c):
    if r < len(rows) and c < len(rows[r]):
        return rows[r][c].strip()
    return ""


def parse_project(label_col, content_col):
    mode = None
    brief_parts = []
    problems = []
    solutions = []
    impacts = []
    receipt = []
    solution_buf = []
    in_receipt = False

    def flush_solution():
        nonlocal solution_buf
        if solution_buf:
            solutions.append("\n".join(solution_buf).strip())
            solution_buf = []

    for r in range(len(rows)):
        label = get_cell(r, label_col)
        content = get_cell(r, content_col)

        if label in SECTION_LABELS:
            flush_solution()
            mode = SECTION_LABELS[label]
            in_receipt = False

        if not content:
            continue

        if content in SKIP_CONTENT:
            if content in ("Impact Area", "Operational Area", "Metric"):
                in_receipt = True
            continue

        if content.startswith("Here is a proposed"):
            continue
        if content.startswith("📈") or content.startswith("⚡") or content.startswith("⏱️"):
            continue
        if content in IMPACT_GROUP_HEADERS:
            continue

        if in_receipt:
            cells = [get_cell(r, content_col + i) for i in range(4)]
            if all(cells) and cells[0] not in SKIP_CONTENT:
                receipt.append(cells)
            continue

        if mode == "brief":
            brief_parts.append(content)
        elif mode == "problems":
            problems.append(content)
        elif mode == "solutions":
            if re.match(r"^\d+\.", content):
                flush_solution()
                solution_buf = [content]
            elif content.startswith("Solution Implemented:") or content.startswith("Product Mechanics:"):
                solution_buf.append(content)
            elif solution_buf:
                solution_buf.append(content)
            else:
                solutions.append(content)
        elif mode == "impact":
            impacts.append(content)

    flush_solution()

    return {
        "brief": "\n\n".join(brief_parts).strip(),
        "problems": problems,
        "solutions": solutions,
        "impacts": impacts,
        "receipt": receipt,
    }


out = {name: parse_project(cols["label"], cols["content"]) for name, cols in PROJECTS.items()}

out_path = r"c:\Users\Swaroop\Documents\Data\Web development projects\client work\laxman-portfolio\parsed.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

for name, d in out.items():
    print(
        f"{name}: brief={len(d['brief'])}, prob={len(d['problems'])}, "
        f"sol={len(d['solutions'])}, imp={len(d['impacts'])}, rec={len(d['receipt'])}"
    )
    if d["problems"]:
        print(f"  first problem: {d['problems'][0][:70]}...")
    if d["impacts"]:
        print(f"  first impact: {d['impacts'][0][:70]}...")
