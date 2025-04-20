from core.assistant import start_assistant
from core.resume_parsing import extract_text_from_pdf, extract_text_from_docx
from config.groq_api import parse_resume_with_groq
if __name__ == "__main__":
    resume_text = extract_text_from_pdf("resume/userID.pdf")
    parsed_resume = parse_resume_with_groq(resume_text)
    print(parsed_resume)
    # start_assistant()
