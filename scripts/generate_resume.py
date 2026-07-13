from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Khristopher_Ben_Manilla_Resume.pdf"

INK = colors.HexColor("#182027")
GOLD = colors.HexColor("#9A6A1E")
MUTED = colors.HexColor("#4D5963")
RULE = colors.HexColor("#D8D0C1")


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()

    name = ParagraphStyle(
        "Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=22,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=2,
    )
    title = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=11,
        textColor=GOLD,
        spaceAfter=3,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=10,
        textColor=MUTED,
        spaceAfter=7,
    )
    section = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=8.7,
        leading=10,
        textColor=GOLD,
        borderColor=RULE,
        borderWidth=0,
        borderPadding=0,
        spaceBefore=5,
        spaceAfter=3,
    )
    role = ParagraphStyle(
        "Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=10.5,
        textColor=INK,
        spaceAfter=1,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.7,
        leading=10.1,
        textColor=INK,
        spaceAfter=2,
    )
    bullet = ParagraphStyle(
        "Bullet",
        parent=body,
        leftIndent=9,
        firstLineIndent=-6,
        bulletIndent=0,
        spaceAfter=1.2,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=7.3,
        leading=9.5,
        textColor=MUTED,
    )

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=12 * mm,
        bottomMargin=11 * mm,
        title="Khristopher Ben Manilla — Resume",
        author="Khristopher Ben Manilla",
        subject="Software engineering internship and junior full-stack opportunities",
    )

    story = [
        Paragraph("KHRISTOPHER BEN MANILLA", name),
        Paragraph("Fourth-Year Computer Science Student · Software Engineering Intern", title),
        Paragraph(
            'Cavite, Philippines &nbsp;·&nbsp; '
            '<link href="mailto:kbmanilla06@gmail.com" color="#4D5963">kbmanilla06@gmail.com</link> &nbsp;·&nbsp; '
            '<link href="https://github.com/kbmanilla06" color="#4D5963">github.com/kbmanilla06</link> &nbsp;·&nbsp; '
            '<link href="https://www.linkedin.com/in/khristopher-ben-manilla-b875181b6/" color="#4D5963">LinkedIn</link>',
            contact,
        ),
        Paragraph("SUMMARY", section),
        Paragraph(
            "Full-stack engineer building secure, AI-enabled workforce tools with React, TypeScript, Laravel, Python, and PostgreSQL. Experienced in translating requirements into documented systems with role-based security, automated testing, and practical machine-learning workflows.",
            body,
        ),
        Paragraph("EXPERIENCE", section),
        KeepTogether([
            Paragraph("Software Engineering Intern — StartupLab Business Center &amp; AI Consulting Services OPC <font color='#4D5963'>| 2026–Present</font>", role),
            Paragraph("• Translated stakeholder requirements into TimeForge: time tracking, approvals, KPIs, payroll preparation, reporting, onboarding, and auditable AI-insight workflows.", bullet),
            Paragraph("• Implemented a Laravel and React/TypeScript architecture with PostgreSQL, four server-enforced roles, protected attachments, and rate-limited authentication flows.", bullet),
            Paragraph("• Established 397 automated tests and created setup, deployment, backup, database, QA, and role-based user documentation.", bullet),
        ]),
        Paragraph("SELECTED PROJECTS", section),
        KeepTogether([
            Paragraph("TimeForge — Full-Stack Workforce Performance Platform <font color='#4D5963'>| React, TypeScript, Laravel, PostgreSQL</font>", role),
            Paragraph("Flagship internship build with 211 backend and 186 frontend tests, four policy-enforced roles, an 80-commit sprint history, Docker, GitHub Actions, and operational runbooks. <link href='https://github.com/kbmanilla06/TimeForge' color='#9A6A1E'>Repository</link>", small),
        ]),
        Spacer(1, 2),
        KeepTogether([
            Paragraph("Customer Churn Prediction <font color='#4D5963'>| Python, Scikit-learn, XGBoost, Streamlit</font>", role),
            Paragraph("Individual end-to-end ML workflow comparing three models; applies SMOTE inside cross-validation to prevent leakage and evaluates held-out results using precision, recall, F1, and ROC-AUC. <link href='https://github.com/kbmanilla06/customer-churn-prediction' color='#9A6A1E'>Repository</link>", small),
        ]),
        Spacer(1, 2),
        KeepTogether([
            Paragraph("NLTKBot <font color='#4D5963'>| Python, NLTK, Flask</font>", role),
            Paragraph("Four-person academic NLP project with 38 intents, four-pass matching, VADER sentiment, POS tagging, lemmatization, and Flask API delivery. <link href='https://github.com/Jassim3nidad/NLTKBot' color='#9A6A1E'>Repository</link>", small),
        ]),
        Paragraph("TECHNICAL SKILLS", section),
        Paragraph("<b>Languages:</b> TypeScript, JavaScript, PHP, Python, SQL &nbsp;·&nbsp; <b>Frameworks:</b> React, Laravel, Next.js, Flask, Streamlit &nbsp;·&nbsp; <b>Data:</b> PostgreSQL, Scikit-learn, XGBoost, NLTK &nbsp;·&nbsp; <b>Engineering:</b> REST APIs, RBAC, automated testing, Docker, GitHub Actions, documentation", body),
        Paragraph("EDUCATION &amp; HONORS", section),
        Paragraph("Bachelor of Science in Computer Science — Lyceum of the Philippines University–Cavite <font color='#4D5963'>| 2023–Present</font>", role),
        Paragraph("Fourth-Year Student · Dean’s List Awardee for three consecutive academic years (2023–2026)", small),
    ]

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
