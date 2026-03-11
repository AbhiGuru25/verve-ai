import fitz
doc = fitz.open("AXON_Project_Overview.pdf")
text = "\n".join(page.get_text() for page in doc)
with open("overview.txt", "w", encoding="utf-8") as f:
    f.write(text)
