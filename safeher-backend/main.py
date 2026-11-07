from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres.papswgfiealzzkyfaqga:SafeHer%402026@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="SafeHer AI Backend")

# Frontend (Next.js) එකෙන් එන requests වලට අවසර දීම
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class IncidentRequest(BaseModel):
    age_group: str
    preferred_language: str
    description: str
    platform: Optional[str] = "WhatsApp"
    incident_date: Optional[str] = "Recently"

class ApproveReportRequest(BaseModel):
    report_id: int
    corrected_category: Optional[str] = None

class ConsultationRequestModel(BaseModel):
    report_id: int
    professional_id: int


@app.get("/")
def read_root():
    return {"message": "SafeHer AI Backend is Running!"}


# 1. Screen 1 & 2: Analyze Incident
@app.post("/api/analyze")
def analyze_incident(data: IncidentRequest):
    db = SessionLocal()
    try:
        # A. User record එකක් සෑදීම
        user_res = db.execute(
            text("INSERT INTO users (age_group, preferred_language) VALUES (:ag, :lang) RETURNING id"),
            {"ag": data.age_group, "lang": data.preferred_language}
        ).fetchone()
        user_id = user_res[0]

        # B. Incident report එකක් සෑදීම
        report_res = db.execute(
            text("""
                INSERT INTO incident_reports (user_id, description, platform, incident_date) 
                VALUES (:uid, :desc, :plat, :idate) RETURNING id
            """),
            {"uid": user_id, "desc": data.description, "plat": data.platform, "idate": data.incident_date}
        ).fetchone()
        report_id = report_res[0]

        # C. AI Classification Logic (Prototype Rule-based Engine)
        desc_lower = data.description.lower()
        if "stalk" in desc_lower or "follow" in desc_lower or "tracking" in desc_lower or "message" in desc_lower:
            category = "Cyberstalking"
            confidence = 86.0
            explanation = "Repeated unsolicited messages and attempts to monitor your activity indicate cyberstalking patterns."
        elif "threat" in desc_lower or "kill" in desc_lower or "harm" in desc_lower or "expose" in desc_lower:
            category = "Threats & Intimidation"
            confidence = 91.0
            explanation = "Direct threatening language and intimidating remarks were identified in your report."
        elif "photo" in desc_lower or "picture" in desc_lower or "video" in desc_lower or "fake account" in desc_lower:
            category = "Impersonation & Fake Accounts"
            confidence = 88.0
            explanation = "Unauthorized profile creation or distribution of media content detected."
        else:
            category = "Online Harassment"
            confidence = 80.0
            explanation = "Persistent unwanted interactions and abusive conduct identified across digital channels."

        # D. Database එකේ AI classification එක save කිරීම
        db.execute(
            text("""
                INSERT INTO ai_classifications (report_id, detected_category, confidence_score, explanation)
                VALUES (:rid, :cat, :conf, :exp)
            """),
            {"rid": report_id, "cat": category, "conf": confidence, "exp": explanation}
        )
        db.commit()

        # E. Timeline පෙළගැස්වීම
        timeline = [
            {"date": "Initial Encounter", "event": f"First unauthorized interaction on {data.platform}"},
            {"date": "Escalation", "event": "Repeated messaging and abusive patterns observed"},
            {"date": "Present", "event": "Incident documented securely on SafeHer AI platform"}
        ]

        return {
            "report_id": report_id,
            "detected_category": category,
            "confidence_score": confidence,
            "explanation": explanation,
            "timeline": timeline,
            "platform": data.platform
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


# 2. Screen 3: User Approval & Category Correction
@app.post("/api/report/approve")
def approve_report(data: ApproveReportRequest):
    db = SessionLocal()
    try:
        db.execute(
            text("UPDATE incident_reports SET user_approved = TRUE, status = 'approved' WHERE id = :rid"),
            {"rid": data.report_id}
        )
        if data.corrected_category:
            db.execute(
                text("UPDATE ai_classifications SET corrected_category = :cor WHERE report_id = :rid"),
                {"cor": data.corrected_category, "rid": data.report_id}
            )
        db.commit()
        return {"status": "success", "message": "Incident report approved by user."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


# 3. Screen 4: Get Verified Professionals
@app.get("/api/professionals")
def get_professionals():
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT id, name, role, languages, availability_status FROM professionals")).fetchall()
        professionals = [
            {
                "id": row[0],
                "name": row[1],
                "role": row[2],
                "languages": row[3],
                "availability": row[4]
            }
            for row in result
        ]
        return {"professionals": professionals}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


# 4. Screen 4 & 5: Request Consultation
@app.post("/api/consultation/request")
def request_consultation(data: ConsultationRequestModel):
    db = SessionLocal()
    try:
        res = db.execute(
            text("""
                INSERT INTO consultation_requests (report_id, professional_id, status)
                VALUES (:rid, :pid, 'accepted') RETURNING id, status
            """),
            {"rid": data.report_id, "pid": data.professional_id}
        ).fetchone()
        db.commit()
        return {
            "request_id": res[0],
            "status": res[1],
            "message": "Request accepted by verified professional. Audio channel ready."
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()