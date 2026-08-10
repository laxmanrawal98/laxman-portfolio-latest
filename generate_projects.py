import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

parsed_path = r"c:\Users\Swaroop\Documents\Data\Web development projects\client work\laxman-portfolio\parsed.json"
with open(parsed_path, encoding="utf-8") as f:
    parsed = json.load(f)

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
        "links": [],
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
order = ["upscape", "residency", "srieye", "realestate", "pawn", "solar"]

for key in order:
    meta = dict(META[key])
    if key in parsed:
        content = parsed[key]
        meta["brief"] = content["brief"]
        meta["problems"] = content["problems"]
        meta["solutions"] = content["solutions"]
        meta["impacts"] = content["impacts"]
        meta["receipt"] = content["receipt"]
        meta["metrics"] = derive_metrics(content["impacts"])
    else:
        meta.setdefault("brief", "")
        meta.setdefault("problems", [])
        meta.setdefault("solutions", [])
        meta.setdefault("impacts", [])
        meta.setdefault("receipt", [])
        meta.setdefault("metrics", [])

    projects.append(meta)

print(json.dumps(projects, indent=2, ensure_ascii=False))
