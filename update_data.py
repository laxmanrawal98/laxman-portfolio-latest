import csv
import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

ROOT = r"c:\Users\Swaroop\Documents\Data\Web development projects\client work\laxman-portfolio"
CSV_PATH = r"C:\Users\Swaroop\Downloads\CV Projects  - Projects - Scalify With AI.csv"
DATA_JS = ROOT + r"\js\data.js"

# --- parse CSV (inline) ---
with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
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


parsed = {name: parse_project(cols["label"], cols["content"]) for name, cols in PROJECTS.items()}

META = {
    "upscape": {
        "id": "upscape",
        "niche": "Construction",
        "filter": "construction",
        "title": "Architect - Upscape",
        "subtitle": "Upscape Build™ — Tech-Enabled Design & Construction Platform",
        "tags": ["ERP", "Stage Gates", "Field Ops", "Client Portal", "P&L"],
        "videos": [
            {"id": "1-zH_JhgkgWLqXXxfeAq09YMZBe4FWhI7", "label": "Product walkthrough"},
            {"id": "1nXAJu1t9LiakHJFxbnnRB3g-Heuxa3Yj", "label": "WhatsApp booking agent"},
        ],
        "links": [
            {
                "href": "https://upscape-build-lac.vercel.app/",
                "label": "Live Demo",
            }
        ],
    },
    "residency": {
        "id": "residency",
        "niche": "Medical Hospitality",
        "filter": "hospitality",
        "title": "Residency",
        "subtitle": "Extended-stay medical residency lodges",
        "tags": ["WhatsApp AI", "IoT", "OCR", "Voice Agents", "PMS"],
        "videos": [
            {"id": "1idq4ZKhunZakxE3Q2mXVh17y3TNe46xV", "label": "WhatsApp booking agent"},
            {"id": "1FHEea3Cw8CxMBazwkCvrrb1OF9szKP-V", "label": "Operations dashboard"},
            {"id": "1npqxV9XWbN_lg77RM83OF6vpzv7lCLto", "label": "Smart switch demo"},
        ],
        "links": [],
    },
    "srieye": {
        "id": "srieye",
        "niche": "Healthcare",
        "filter": "healthcare",
        "title": "Sri Eye Hospital",
        "subtitle": "NABH-accredited super-specialty eye hospital",
        "tags": ["Lead Aggregation", "Voice AI", "WhatsApp", "Care CRM"],
        "videos": [],
        "links": [],
    },
    "realestate": {
        "id": "realestate",
        "niche": "Real Estate",
        "filter": "realestate",
        "title": "Real Estate Brokers",
        "subtitle": "Integrated Real Estate Developer & Master Brokerage Firm",
        "tags": ["CRM", "LinkedIn API", "Voice AI", "Veo", "Imagen"],
        "videos": [],
        "links": [
            {
                "href": "https://ai.studio/apps/95caadc2-0c33-434b-8d7b-50d4faebc6f5",
                "label": "Live demo",
            }
        ],
    },
    "pawn": {
        "id": "pawn",
        "niche": "Fintech Ops",
        "filter": "automation",
        "title": "Pawn Broker",
        "subtitle": "",
        "brief": "",
        "problems": [],
        "solutions": [],
        "impacts": [],
        "receipt": [],
        "metrics": [],
        "tags": ["WhatsApp AI"],
        "videos": [{"id": "19SbA-JZLfA0r20LCThGIjbfeAFMlplKp", "label": "Agent demo"}],
        "links": [],
    },
    "solar": {
        "id": "solar",
        "niche": "Solar",
        "filter": "solar",
        "title": "Residential & Commercial Solar Agent",
        "subtitle": "AI Voice Agent for Solar Agent",
        "tags": ["Voice AI", "Lead Qualification", "Solar"],
        "videos": [],
        "links": [],
    },
}


def derive_metrics(impacts):
    metrics = []
    for imp in impacts:
        m = re.match(
            r"^([\d.]+%\+?|\d+\.\d+x|\d+x|<\d+\s*(?:s|secs|seconds)|4\.8/5|\$[\d,]+(?:\s*USD)?|95%\+|100%)",
            imp,
            re.I,
        )
        if m:
            label = imp.split(":")[0].strip() if ":" in imp else imp[:48]
            metrics.append({"value": m.group(1).strip(), "label": label})
        if len(metrics) >= 3:
            break
    return metrics


projects = []
for key in ["upscape", "residency", "srieye", "realestate", "pawn", "solar"]:
    item = dict(META[key])
    if key in parsed:
        item.update(parsed[key])
        item["metrics"] = derive_metrics(parsed[key]["impacts"])
    projects.append(item)

# Read existing data.js and replace projects block
with open(DATA_JS, encoding="utf-8") as f:
    src = f.read()

start = src.index("  projects: [")
end = src.index("\n  skills:", start)
body = json.dumps(projects, indent=2, ensure_ascii=False)
body = "\n".join(("  " + line) if line else line for line in body.splitlines())
projects_js = "  projects: " + body

new_src = src[:start] + projects_js + "," + src[end:]
with open(DATA_JS, "w", encoding="utf-8", newline="\n") as f:
    f.write(new_src)

print("Updated data.js with", len(projects), "projects")
