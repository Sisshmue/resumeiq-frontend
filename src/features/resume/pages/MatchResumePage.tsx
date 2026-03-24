import { useState } from "react";
import { matchResume } from "../services/resumeAPI";
import type { MatchResume } from "../types/resumeType";
import Header from "../../../shared/components/Header";

export default function MatchResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJD] = useState("");
  const [matchResult, setMatchResult] = useState<MatchResume | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !jd) return;
    setLoading(true);
    try {
      const res = await matchResume(file, jd);
      setMatchResult(res);
    } catch (error) {
      console.log(error);
      alert("Match resume failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900">JD Match Analysis</h1>
            <p className="text-slate-500 mt-2">Compare your resume against specific job requirements.</p>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-4 text-center">Upload Resume</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer relative">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf"
                  onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); }}
                />
                <span className="text-4xl">📄</span>
                <p className="text-sm text-slate-500 mt-2">{file ? file.name : "Select PDF"}</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Job Description</label>
              <textarea
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none text-sm"
                placeholder="Paste the job requirements here..."
                value={jd}
                onChange={(e) => setJD(e.target.value)}
              />
              <button
                onClick={handleUpload}
                disabled={loading || !file || !jd}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all 
                  ${loading || !file || !jd ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700 shadow-lg active:scale-95"}`}
              >
                {loading ? "Calculating Match..." : "Check Match Score"}
              </button>
            </div>
          </div>

          {/* RESULT DASHBOARD */}
          {matchResult && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Row 1: Match Score & Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <span className="text-slate-500 font-medium text-xs mb-2 uppercase tracking-widest">Job Match Score</span>
                  <div className="text-6xl font-black text-blue-600">
                    {matchResult.analysis.ATS_score}<span className="text-2xl text-slate-300">/100</span>
                  </div>
                </div>
                <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2">Analysis Overview</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{matchResult.analysis.overview}</p>
                </div>
              </div>

              {/* Row 2: Strengths & Weaknesses (Arrays) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultListCard title="Key Strengths" items={matchResult.analysis.strengths} icon="✅" bgColor="bg-green-50" textColor="text-green-800" />
                <ResultListCard title="Alignment Gaps" items={matchResult.analysis.weaknesses} icon="❌" bgColor="bg-red-50" textColor="text-red-800" />
              </div>

              {/* Row 3: Keywords Cloud */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="text-xl">🔍</span> Keyword Gap Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Found in both</span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.keywords.found_keywords.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100 italic">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Missing in Resume</span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.keywords.missing_keywords.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
                          + {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Future Growth & Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ResultListCard title="Alternative Job Matches" items={matchResult.analysis.suggested_job_roles} icon="💼" bgColor="bg-slate-100" textColor="text-slate-800" />
                 <ResultListCard title="Recommended Skills" items={matchResult.analysis.recommended_skills_to_learn} icon="🧠" bgColor="bg-indigo-50" textColor="text-indigo-900" />
              </div>

              {/* Actionable Suggestions */}
              <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl italic font-serif">"</div>
                <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>💡</span> Tips to Increase Your Score
                </h4>
                <ul className="space-y-3">
                  {matchResult.analysis.resume_improvements_suggestions.map((tip, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-3 border-b border-slate-800 pb-3 last:border-0">
                      <span className="text-blue-500 font-bold">{i + 1}.</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable component for the array-based cards
function ResultListCard({ title, items, icon, bgColor, textColor }: { title: string, items: string[], icon: string, bgColor: string, textColor: string }) {
  return (
    <div className={`${bgColor} p-6 rounded-2xl border border-black/5 shadow-sm`}>
      <h4 className={`${textColor} font-bold mb-4 flex items-center gap-2`}>
        <span className="text-xl">{icon}</span> {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`text-xs ${textColor} opacity-80 flex items-start gap-2 leading-relaxed`}>
            <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}