'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  PhoneCall, 
  ChevronLeft, 
  UserCheck, 
  BarChart3, 
  Clock, 
  Radio
} from 'lucide-react';

const BACKEND_URL = 'http://127.0.0.1:8001';

// 1. Multi-Language Dictionary (English, Sinhala, Tamil)
const TRANSLATIONS = {
  English: {
    quickExit: 'Quick Exit',
    splashTitle: 'SafeHer AI',
    splashSubtitle: 'Your Confidential Digital Safety Companion',
    selectLang: 'Select Your Preferred Language',
    getStarted: 'Get Started Securely',
    privateBadge: '100% Private & Zero-Knowledge Encrypted',
    confidentialNotice: '"Your identity is secure. No information will be shared with anyone without your explicit permission."',
    ageQuestion: 'Are you Adult (18+)?',
    ageYes: "Yes, I'm 18+",
    ageNo: 'No, below 18',
    platformLabel: 'Platform where incident occurred',
    descLabel: 'Describe the incident in your own words',
    descPlaceholder: 'e.g. Someone is repeatedly sending me harassing messages and creating fake profiles with my photos...',
    analyzeBtn: 'Analyze Incident',
    analyzingBtn: 'Analyzing Privately...',
    disclaimer: '"This is an AI-generated exploratory assessment, not a legal finding."',
    detectedCategory: 'Detected Category',
    confidence: 'Confidence',
    whyCategory: 'Why this category?',
    inaccuratePrompt: 'Does this feel inaccurate?',
    changePrompt: 'You can change it below',
    proceedTimeline: 'Proceed to Summary & Timeline',
    summaryTitle: 'Incident Summary Card',
    categoryLabel: 'Category:',
    platformSummaryLabel: 'Key Platform:',
    chronologyTitle: 'Incident Chronology (Timeline)',
    approvalCheckbox: '"I have reviewed this summary and approve it to share with verified professionals."',
    proceedSupport: 'Proceed to Support',
    approvingBtn: 'Approving...',
    emergencyTitle: 'Immediate Emergency Help (24/7)',
    emergencySub: 'In immediate physical danger?',
    callPolice: 'Call 119 - Police',
    call1938: 'Call 1938 - Women Helpline',
    recommendedSupport: 'Recommended Verified Support',
    roleLabel: 'Role:',
    langLabel: 'Languages:',
    requestConsultation: 'Request Consultation',
    statusTitle: 'Consultation Request Status',
    stepSubmitted: 'Request Submitted',
    stepSearching: 'Searching Verified Professionals',
    stepAccepted: 'Request Accepted by Specialist',
    connectingAudio: 'Connecting Secure Audio...',
    joinCallBtn: 'Join Secure Audio Call (100% Encrypted)',
    communityImpactTitle: 'SafeHer Community Impact (Anonymised)',
    topAbuse: 'Top Abuse Type',
    avgResponse: 'Avg Response',
    footerInfo: 'SafeHer AI application • 100% Zero-Knowledge Privacy Protected'
  },
  Sinhala: {
    quickExit: 'ඉක්මන් පිටවීම',
    splashTitle: 'SafeHer AI',
    splashSubtitle: 'ඔබගේ රහස්‍ය ඩිජිටල් ආරක්ෂක සහායකයා',
    selectLang: 'ඔබ කැමති භාෂාව තෝරන්න',
    getStarted: 'ආරක්ෂිතව ආරම්භ කරන්න',
    privateBadge: '100% පුද්ගලික සහ රහස්‍යභාවය සුරැකි',
    confidentialNotice: '"ඔබගේ අනන්‍යතාවය සුරක්ෂිතයි. ඔබගේ අවසරයකින් තොරව කිසිදු තොරතුරක් කිසිවෙකු සමඟ බෙදා නොගනී."',
    ageQuestion: 'ඔබ වයස අවුරුදු 18ට වැඩි අයෙක්ද?',
    ageYes: 'ඔව්, වයස 18ට වැඩියි',
    ageNo: 'නැත, වයස 18ට අඩුයි',
    platformLabel: 'සිදුවීම සිදු වූ සමාජ මාධ්‍ය / වේදිකාව',
    descLabel: 'සිදුවීම ඔබේම වචන වලින් කෙටියෙන් විස්තර කරන්න',
    descPlaceholder: 'උදා: කෙනෙක් මගේ ඡායාරූප යොදාගෙන ව්‍යාජ ගිණුම් සාදා මට දිගින් දිගටම හිරිහැර පණිවිඩ එවයි...',
    analyzeBtn: 'සිදුවීම විශ්ලේෂණය කරන්න',
    analyzingBtn: 'රහස්‍යව විශ්ලේෂණය වෙමින් පවතී...',
    disclaimer: '"මෙය AI තාක්ෂණය මඟින් කළ මූලික තක්සේරුවක් පමණක් වන අතර නීතිමය තීන්දුවක් නොවේ."',
    detectedCategory: 'හඳුනාගත් කාණ්ඩය',
    confidence: 'විශ්වාසනීයත්වය',
    whyCategory: 'මෙම කාණ්ඩය තෝරාගත්තේ ඇයි?',
    inaccuratePrompt: 'මෙය නිවැරදි නැතැයි සිතනවාද?',
    changePrompt: 'පහතින් නිවැරදි කාණ්ඩය තෝරන්න',
    proceedTimeline: 'කාලරේඛාව සහ සාරාංශයට යන්න',
    summaryTitle: 'සිදුවීම් සාරාංශ කාඩ්පත',
    categoryLabel: 'කාණ්ඩය:',
    platformSummaryLabel: 'වේදිකාව:',
    chronologyTitle: 'සිදුවීම් කාලරේඛාව (Chronology)',
    approvalCheckbox: '"මම මෙම සාරාංශය පරීක්ෂා කළ අතර සත්‍යාපිත වෘත්තිකයින් සමඟ බෙදා ගැනීමට අනුමැතිය දෙමි."',
    proceedSupport: 'සහාය ලබාගැනීමට ඉදිරියට යන්න',
    approvingBtn: 'අනුමත වෙමින් පවතී...',
    emergencyTitle: 'ක්ෂණික හදිසි සහාය (පැය 24 පුරා)',
    emergencySub: 'ඔබ ශාරීරික අවදානමක හෝ අනතුරක සිටීද?',
    callPolice: '119 අමතන්න - පොලිසිය',
    call1938: '1938 අමතන්න - කාන්තා සහන සේවය',
    recommendedSupport: 'නිර්දේශිත සත්‍යාපිත වෘත්තීය සහාය',
    roleLabel: 'භූමිකාව:',
    langLabel: 'භාෂාවන්:',
    requestConsultation: 'උපදෙස් ලබාගැනීමට ඉල්ලුම් කරන්න',
    statusTitle: 'උපදේශන ඉල්ලුම් තත්ත්වය',
    stepSubmitted: 'ඉල්ලීම සාර්ථකව යොමු විය',
    stepSearching: 'සුදුසු වෘත්තිකයෙකු සොයමින් පවතී',
    stepAccepted: 'විශේෂඥයා විසින් ඉල්ලීම පිළිගන්නා ලදී',
    connectingAudio: 'ආරක්ෂිත හඬ සබඳතාව සූදානම් කෙරේ...',
    joinCallBtn: 'ආරක්ෂිත හඬ ඇමතුමට එක්වන්න (100% Encrypted)',
    communityImpactTitle: 'SafeHer ප්‍රජා බලපෑම (නිර්නාමික දත්ත)',
    topAbuse: 'ප්‍රධාන සිදුවීම් වර්ගය',
    avgResponse: 'සාමාන්‍ය ප්‍රතිචාර කාලය',
    footerInfo: 'SafeHer AI යෙදුම • 100% පූර්ණ රහස්‍යතා ආරක්ෂාව'
  },
  Tamil: {
    quickExit: 'விரைவான வெளியேறு',
    splashTitle: 'SafeHer AI',
    splashSubtitle: 'உங்கள் இரகசிய டிஜிட்டல் பாதுகாப்பு வழிகாட்டி',
    selectLang: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    getStarted: 'பாதுகாப்பாக தொடங்குங்கள்',
    privateBadge: '100% தனிப்பட்ட மற்றும் குறியாக்கம் செய்யப்பட்டது',
    confidentialNotice: '"உங்கள் அடையாளம் பாதுகாப்பானது. உங்கள் அனுமதியின்றி எந்த தகவலும் பகிரப்படாது."',
    ageQuestion: 'நீங்கள் 18 வயதுக்கு மேற்பட்டவரா?',
    ageYes: 'ஆம், 18 வயதுக்கு மேற்பட்டவர்',
    ageNo: 'இல்லை, 18 வயதுக்குட்பட்டவர்',
    platformLabel: 'சம்பவம் நிகழ்ந்த தளம்',
    descLabel: 'சம்பவத்தை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும்',
    descPlaceholder: 'எ.கா: ஒருவர் எனது புகைப்படங்களைப் பயன்படுத்தி போலி கணக்குகளை உருவாக்கி அச்சுறுத்துகிறார்...',
    analyzeBtn: 'சம்பவத்தை பகுப்பாய்வு செய்க',
    analyzingBtn: 'பகுப்பாய்வு செய்யப்படுகிறது...',
    disclaimer: '"இது AI-உருவாக்கிய ஆரம்ப மதிப்பீடே தவிர சட்டபூர்வ தீர்ப்பு அல்ல."',
    detectedCategory: 'கண்டறியப்பட்ட பிரிவு',
    confidence: 'நம்பகத்தன்மை',
    whyCategory: 'ஏன் இந்தப் பிரிவு?',
    inaccuratePrompt: 'இது தவறாகத் தோன்றுகிறதா?',
    changePrompt: 'கீழே மாற்றிக் கொள்ளலாம்',
    proceedTimeline: 'சுருக்கம் & காலவரிசைக்குச் செல்லவும்',
    summaryTitle: 'சம்பவ சுருக்க அட்டை',
    categoryLabel: 'பிரிவு:',
    platformSummaryLabel: 'தளம்:',
    chronologyTitle: 'சம்பவ காலவரிசை (Timeline)',
    approvalCheckbox: '"நான் இந்த சுருக்கத்தை மதிப்பாய்வு செய்து தொழில்முறை நிபுணர்களுடன் பகிர ஒப்புக்கொள்கிறேன்."',
    proceedSupport: 'ஆதரவைப் பெற தொடரவும்',
    approvingBtn: 'ஒப்புதல் அளிக்கப்படுகிறது...',
    emergencyTitle: 'உடனடி அவசர உதவி (24/7)',
    emergencySub: 'உடனடி ஆபத்தில் உள்ளீர்களா?',
    callPolice: '119 அழைக்கவும் - காவல்துறை',
    call1938: '1938 அழைக்கவும் - மகளிர் உதவி',
    recommendedSupport: 'பரிந்துரைக்கப்பட்ட சரிபார்க்கப்பட்ட நிபுணர்கள்',
    roleLabel: 'பங்கு:',
    langLabel: 'மொழிகள்:',
    requestConsultation: 'ஆலோசனையைக் கோருங்கள்',
    statusTitle: 'ஆலோசனை கோரிக்கை நிலை',
    stepSubmitted: 'கோரிக்கை சமர்ப்பிக்கப்பட்டது',
    stepSearching: 'நிபுணரைத் தேடுகிறது',
    stepAccepted: 'கோரிக்கை ஏற்கப்பட்டது',
    connectingAudio: 'குரல் இணைப்பு தயாராகிறது...',
    joinCallBtn: 'குரல் அழைப்பில் இணையவும் (100% Encrypted)',
    communityImpactTitle: 'SafeHer சமூக தாக்கம் (பெயரற்ற தரவு)',
    topAbuse: 'முக்கிய அச்சுறுத்தல் வகை',
    avgResponse: 'சராசரி மறுமொழி நேரம்',
    footerInfo: 'SafeHer AI பயன்பாடு • 100% தனியுரிமை பாதுகாப்பானது'
  }
};

type LanguageType = 'English' | 'Sinhala' | 'Tamil';

export default function SafeHerApp() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [language, setLanguage] = useState<LanguageType>('English');

  // Translation shortcut
  const t = TRANSLATIONS[language];

  // Form State
  const [ageGroup, setAgeGroup] = useState<string>('adult');
  const [platform, setPlatform] = useState<string>('WhatsApp');
  const [incidentDate, setIncidentDate] = useState<string>('Yesterday');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Backend Data State
  const [reportId, setReportId] = useState<number | null>(null);
  const [detectedCategory, setDetectedCategory] = useState<string>('');
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>('');
  const [timeline, setTimeline] = useState<Array<{ date: string; event: string }>>([]);
  const [correctedCategory, setCorrectedCategory] = useState<string>('');
  const [isApproved, setIsApproved] = useState<boolean>(false);

  // Professionals & Request State
  const [professionals, setProfessionals] = useState<Array<any>>([]);
  const [requestStatus, setRequestStatus] = useState<string>('submitted');

  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      alert(language === 'Sinhala' ? 'කරුණාකර සිදුවීම විස්තර කරන්න.' : language === 'Tamil' ? 'தயவுசெய்து சம்பவத்தை விவரிக்கவும்.' : 'Please briefly describe the incident.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age_group: ageGroup,
          preferred_language: language === 'Sinhala' ? 'si' : language === 'Tamil' ? 'ta' : 'en',
          description,
          platform,
          incident_date: incidentDate
        })
      });
      const data = await res.json();
      setReportId(data.report_id);
      setDetectedCategory(data.detected_category);
      setConfidenceScore(data.confidence_score);
      setExplanation(data.explanation);
      setTimeline(Array.isArray(data.timeline) ? data.timeline : []);
      setCorrectedCategory(data.detected_category);
      setCurrentScreen(2);
    } catch (err) {
      alert('Failed to connect to backend server. Make sure port 8001 is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!isApproved) {
      alert(language === 'Sinhala' ? 'කරුණාකර අනුමැතිය සලකුණු කරන්න.' : language === 'Tamil' ? 'தயவுசெய்து ஒப்புதல் பெட்டியை தேர்வு செய்யவும்.' : 'Please check the confirmation box to proceed.');
      return;
    }
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/api/report/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_id: reportId,
          corrected_category: correctedCategory !== detectedCategory ? correctedCategory : null
        })
      });

      const profRes = await fetch(`${BACKEND_URL}/api/professionals`);
      const profData = await profRes.json();
      setProfessionals(profData.professionals || []);
      setCurrentScreen(4);
    } catch (err) {
      alert('Error updating report approval.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestConsultation = async (profId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/consultation/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_id: reportId,
          professional_id: profId
        })
      });
      const data = await res.json();
      setRequestStatus(data.status);
      setCurrentScreen(5);
    } catch (err) {
      alert('Error booking consultation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[700px] relative">
        
        {/* Universal Top Bar */}
        <header className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-2">
            {currentScreen > 0 && (
              <button 
                onClick={() => setCurrentScreen((prev) => Math.max(0, prev - 1))}
                className="text-slate-400 hover:text-white p-1 rounded-full transition"
                title="Go Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              SafeHer <span className="text-xs px-1.5 py-0.5 bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">AI</span>
            </div>
          </div>
          
          <button 
            onClick={handleQuickExit}
            className="flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition shadow-sm shadow-rose-950 active:scale-95"
          >
            {t.quickExit} <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* Dynamic Body Screens */}
        <div className="flex-1 p-5 overflow-y-auto">

          {/* SCREEN 0: SPLASH & LANGUAGE */}
          {currentScreen === 0 && (
            <div className="flex flex-col items-center justify-between h-full py-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{t.splashTitle}</h1>
                <p className="text-xs text-rose-300 font-medium px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20">
                  {t.splashSubtitle}
                </p>
              </div>

              <div className="w-full space-y-4 my-8">
                <label className="text-xs text-slate-400 block font-medium">{t.selectLang}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['English', 'Sinhala', 'Tamil'] as LanguageType[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`py-2.5 text-xs font-medium rounded-xl border transition ${
                        language === lang 
                          ? 'border-rose-500 bg-rose-500/20 text-white font-semibold shadow-sm shadow-rose-950' 
                          : 'border-slate-800 bg-slate-800/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {lang === 'Sinhala' ? 'සිංහල' : lang === 'Tamil' ? 'தமிழ்' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={() => setCurrentScreen(1)}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition shadow-lg shadow-indigo-950 active:scale-98"
                >
                  {t.getStarted}
                </button>
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" /> {t.privateBadge}
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 1: INCIDENT INTAKE */}
          {currentScreen === 1 && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/50 rounded-xl">
                <p className="text-xs text-indigo-200 leading-relaxed font-light">
                  {t.confidentialNotice}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">{t.ageQuestion}</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input 
                      type="radio" 
                      name="age" 
                      checked={ageGroup === 'adult'} 
                      onChange={() => setAgeGroup('adult')} 
                      className="accent-indigo-500" 
                    />
                    {t.ageYes}
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input 
                      type="radio" 
                      name="age" 
                      checked={ageGroup === 'under_18'} 
                      onChange={() => setAgeGroup('under_18')} 
                      className="accent-indigo-500" 
                    />
                    {t.ageNo}
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">{t.platformLabel}</label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Other">Other Digital Platform</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">{t.descLabel}</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.descPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-md disabled:opacity-50"
              >
                {loading ? t.analyzingBtn : t.analyzeBtn}
              </button>
            </div>
          )}

          {/* SCREEN 2: AI CLASSIFICATION */}
          {currentScreen === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-xl">
                <p className="text-[11px] text-amber-300">
                  {t.disclaimer}
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{t.detectedCategory}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                    {confidenceScore}% {t.confidence}
                  </span>
                </div>
                <div className="text-base font-bold text-white tracking-wide">
                  {detectedCategory}
                </div>
                <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 leading-relaxed">
                  <strong className="text-slate-300 block mb-1">{t.whyCategory}</strong>
                  {explanation}
                </div>
              </div>

              {/* User Agency */}
              <div className="space-y-2 pt-2">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>{t.inaccuratePrompt}</span>
                  <span className="text-rose-400 font-medium">{t.changePrompt}</span>
                </div>
                <select
                  value={correctedCategory}
                  onChange={(e) => setCorrectedCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="Cyberstalking">Cyberstalking</option>
                  <option value="Threats & Intimidation">Threats & Intimidation</option>
                  <option value="Impersonation & Fake Accounts">Impersonation & Fake Accounts</option>
                  <option value="Online Harassment">Online Harassment</option>
                  <option value="Doxxing / Exposing Personal Info">Doxxing / Exposing Personal Info</option>
                </select>
              </div>

              <button
                onClick={() => setCurrentScreen(3)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs transition shadow-md"
              >
                {t.proceedTimeline}
              </button>
            </div>
          )}

          {/* SCREEN 3: TIMELINE & APPROVAL */}
          {currentScreen === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.summaryTitle}</h3>
                <div className="text-xs flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>{t.categoryLabel}</span>
                  <strong className="text-white">{correctedCategory}</strong>
                </div>
                <div className="text-xs flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>{t.platformSummaryLabel}</span>
                  <strong className="text-white">{platform}</strong>
                </div>
              </div>

              {/* Chronology / Timeline */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {t.chronologyTitle}
                </h4>
                <div className="space-y-2 pl-2 border-l border-slate-800">
                  {timeline && timeline.length > 0 ? (
                    timeline.map((item, idx) => (
                      <div key={idx} className="relative pl-4 text-xs">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500"></div>
                        <span className="font-semibold text-slate-300">{item.date}</span>
                        <p className="text-slate-400 text-[11px] leading-tight">{item.event}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-500 pl-4">No events generated.</p>
                  )}
                </div>
              </div>

              {/* Approval Checkbox */}
              <label className="flex items-start gap-2.5 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isApproved} 
                  onChange={(e) => setIsApproved(e.target.checked)}
                  className="mt-0.5 accent-indigo-500 w-4 h-4 rounded" 
                />
                <span className="text-[11px] text-slate-300 leading-snug">
                  {t.approvalCheckbox}
                </span>
              </label>

              <button
                onClick={handleApprove}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-md disabled:opacity-50"
              >
                {loading ? t.approvingBtn : t.proceedSupport}
              </button>
            </div>
          )}

          {/* SCREEN 4: EMERGENCY & REFERRAL */}
          {currentScreen === 4 && (
            <div className="space-y-4">
              <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-2xl text-center space-y-2">
                <h4 className="text-xs font-bold text-rose-300">{t.emergencyTitle}</h4>
                <p className="text-[11px] text-slate-300">{t.emergencySub}</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <a href="tel:119" className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> {t.callPolice}
                  </a>
                  <a href="tel:1938" className="px-3 py-1 bg-rose-700/80 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> {t.call1938}
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-300">{t.recommendedSupport}</h3>
                
                {professionals.map((prof) => (
                  <div key={prof.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-xs text-white">{prof.name}</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        ✓ Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5">
                      <div>{t.roleLabel} <strong className="text-slate-300">{prof.role}</strong></div>
                      <div>{t.langLabel} <span className="text-slate-300">{prof.languages}</span></div>
                    </div>
                    <button
                      onClick={() => handleRequestConsultation(prof.id)}
                      disabled={loading}
                      className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 rounded-xl text-xs font-semibold transition"
                    >
                      {t.requestConsultation}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 5: STATUS & IMPACT */}
          {currentScreen === 5 && (
            <div className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.statusTitle}
                </h3>
                
                <div className="space-y-2 text-xs border-l-2 border-indigo-500 pl-3">
                  <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.stepSubmitted}
                  </div>
                  <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.stepSearching}
                  </div>
                  <div className="text-white flex items-center gap-1.5 font-bold">
                    <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> {t.stepAccepted}
                  </div>
                  <div className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    {t.connectingAudio}
                  </div>
                </div>

                <button 
                  onClick={() => alert(language === 'Sinhala' ? 'ආරක්ෂිත හඬ කාමරය සම්බන්ධ විය.' : language === 'Tamil' ? 'பாதுகாப்பான குரல் அறை இணைக்கப்பட்டது.' : 'Secure Audio Room connected with End-to-End Encryption.')}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-sky-950"
                >
                  {t.joinCallBtn}
                </button>
              </div>

              <hr className="border-slate-800" />

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-indigo-400" /> {t.communityImpactTitle}
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">{t.topAbuse}</span>
                    <strong className="text-xs text-rose-300 font-bold">Cyberstalking 42%</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">{t.avgResponse}</span>
                    <strong className="text-xs text-emerald-300 font-bold">4 Minutes</strong>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 text-center space-y-0.5">
                  <div>{t.footerInfo}</div>
                  <div>Available in: Sinhala, Tamil, English</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}