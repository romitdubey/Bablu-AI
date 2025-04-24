from groq import Groq
from .playsound import text_to_speech
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq()

def needs_camera(prompt: str) -> bool:
    response = client.chat.completions.create(
        messages=[
            {"role": "system","content":prompts["camera_prompt"]},
            {"role": "user", "content": prompt}
        ],
        model="gemma2-9b-it",
        max_tokens=5
    )
    reply = response.choices[0].message.content.strip().lower()
    if "yes" in reply:
        print("Opening camera...")
        text_to_speech("Opening camera...")
    return "yes" in reply

def ready_for_interview(resume_json, job_description_json) -> str:
    system_prompt = f"""
        You are an AI Interviewer conducting a professional and strict mock interview.
        Use the resume and job description JSON data provided below to ask structured, in-depth questions.
        Do NOT answer any questions. Only ask interview questions.

        RESUME_JSON:
        {resume_json}

        JOB_DESCRIPTION_JSON:
        {job_description_json}

        Instructions:
        1. Begin with a polite introduction and candidate self-introduction.
        2. Then ask about education, ask 2-3 questions.
        3. For each project, ask 3-4 deep technical questions.
        4. Then ask skill-based questions using skills relevant to the job.
        5. Never answer any questions from the user. Always remind them politely.
        6. Ask 1 question in a time, don't ask multiple questions at once.
        7. dont add multiple questions in a single response.
        Start the interview now. with a polite introduction and self-introduction.
        """
    chat_messages = [
            {"role": "system","content":system_prompt},
            {"role": "user", "content": "Let's start the interview!"}
        ]
    json.dump(chat_messages, open("../user_history/chat_messages.json", "w"))
    text = interview_with_groq(chat_messages)
    return text


def interview_with_groq(chat_messages) -> str:
    response = client.chat.completions.create(
        messages=chat_messages,
        model="meta-llama/llama-4-scout-17b-16e-instruct"
    )
    return response.choices[0].message.content.strip().replace("**","")



def analyze_image(base64_image, prompt="What's in this image?"):
    try:
        chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}",
                                },
                            },
                        ],
                    }
                ],
                model="llama-3.2-11b-vision-preview",
                
            )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"❌ Error calling GROQ: {e}")
        return None

def parse_resume_with_groq(text):
    prompt = f"""
    You are a resume parser. Extract the following fields from this resume in JSON format:
    - Name
    - Email
    - Phone
    - Education
    - Skills
    - Experience
    - Projects
    - Certifications
    Resume Text:
    \"\"\"{text}\"\"\"
    """

    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response.choices[0].message.content

def parse_job_description(text):
    prompt = f"""
        You are an expert assistant designed to extract structured information from job descriptions. Given a block of unstructured JD text, return a clean, structured JSON object with the following fields:

        - job_title: (The job title or role)
        - company_name: (If mentioned)
        - location: (If mentioned)
        - employment_type: (e.g., Full-time, Contract, Remote, Hybrid)
        - responsibilities: (List of main responsibilities or duties)
        - required_skills: (Key technical or soft skills required)
        - qualifications: (Educational or certification requirements)
        - experience_required: (Years of experience or relevant fields)
        - technologies: (Specific tools, languages, or platforms mentioned)

        Respond with **only a valid JSON object**. If a field is not present in the JD, return it with `null`.
    \"\"\"{text}\"\"\"
    """

    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response.choices[0].message.content.strip()


