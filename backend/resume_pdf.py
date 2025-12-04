from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Frame
from reportlab.lib.units import mm
import io

def generate_resume_pdf(data):
    """
    data: dict with keys: name, role, summary, skills(list),
    experiences(list of dicts {company,role,from,to,desc}),
    projects(list of dicts {title,link,desc}), achievements(list)
    returns BytesIO
    """
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4,
                            rightMargin=18*mm,leftMargin=18*mm,
                            topMargin=18*mm,bottomMargin=18*mm)

    elements = []
    # Styles
    h1 = ParagraphStyle('h1', fontSize=18, leading=22, spaceAfter=6, alignment=0)
    h2 = ParagraphStyle('h2', fontSize=12, leading=14, spaceAfter=4, textColor=colors.HexColor('#333333'))
    normal = ParagraphStyle('normal', fontSize=10, leading=12)

    name = data.get('name','')
    role = data.get('role','')
    header = f'<b>{name}</b><br/><font size=11 color="#666666">{role}</font>'
    elements.append(Paragraph(header, h1))
    elements.append(Spacer(1,6))

    summary = data.get('summary','')
    if summary:
        elements.append(Paragraph(summary, normal))
        elements.append(Spacer(1,8))

    # Skills as a table-like line
    skills = data.get('skills',[])
    if skills:
        skills_line = ', '.join(skills)
        elements.append(Paragraph(f'<b>Skills:</b> {skills_line}', normal))
        elements.append(Spacer(1,8))

    # Experiences
    exps = data.get('experiences',[])
    if exps:
        elements.append(Paragraph('<b>Experience</b>', h2))
        for e in exps:
            title = f"{e.get('role','')} at {e.get('company','')} ({e.get('from','')} - {e.get('to','')})"
            elements.append(Paragraph(title, ParagraphStyle('sub', fontSize=10, leading=12, textColor=colors.HexColor('#222222'))))
            if e.get('desc'):
                elements.append(Paragraph(e.get('desc'), normal))
            elements.append(Spacer(1,4))

    # Projects
    projs = data.get('projects',[])
    if projs:
        elements.append(Paragraph('<b>Projects</b>', h2))
        for p in projs:
            title = f"{p.get('title','')} {('('+p.get('link')+')') if p.get('link') else ''}"
            elements.append(Paragraph(title, ParagraphStyle('sub', fontSize=10, leading=12, textColor=colors.HexColor('#222222'))))
            if p.get('desc'):
                elements.append(Paragraph(p.get('desc'), normal))
            elements.append(Spacer(1,4))

    # Achievements
    ach = data.get('achievements',[])
    if ach:
        elements.append(Paragraph('<b>Achievements</b>', h2))
        for a in ach:
            elements.append(Paragraph(f'• {a}', normal))

    doc.build(elements)
    buf.seek(0)
    return buf
