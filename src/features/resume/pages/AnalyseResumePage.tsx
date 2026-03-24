import { useState } from "react";
import { analyzeResume } from "../services/resumeAPI";
import type { AnalysisResume } from "../types/resumeType";
import Header from "../../../shared/components/Header";

export default function AnalyseResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResume | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeResume(file);
      setAnalysis(res);
    } catch (error) {
      console.error(error);
      alert("Resume analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ... Hero Section and Upload Card remain the same as your code ... */}
          
          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
              <label className="cursor-pointer text-center">
                <span className="text-blue-600 font-semibold hover:text-blue-700">Click to upload</span>
                <span className="text-slate-500"> or drag and drop</span>
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); }} />
                <p className="text-xs text-slate-400 mt-2">PDF (max. 5MB)</p>
              </label>
              {file && (
                <div className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                  Selected: {file.name}
                </div>
              )}
            </div>
            <button
              onClick={handleUpload}
              disabled={!file || isAnalyzing}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${!file || isAnalyzing ? "bg-slate-300 shadow-none" : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200"}`}
            >
              {isAnalyzing ? "AI is Analyzing..." : "Start Full Analysis"}
            </button>
          </div>

          {/* RESULTS DASHBOARD */}
          {analysis && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Row 1: Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <h3 className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-xs">Overall ATS Score</h3>
                  <div className="text-5xl font-black text-blue-600">{analysis.analysis.ATS_score}<span className="text-xl text-slate-300">/100</span></div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <ScoreBadge label="Skill Relevance" score={analysis.analysis.skill_score} color="bg-indigo-600" />
                  <ScoreBadge label="Experience Impact" score={analysis.analysis.experience_score} color="bg-purple-600" />
                </div>
              </div>

              {/* Row 2: Overview & Experience Level */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Professional Summary</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-xs uppercase tracking-widest">
                    {analysis.analysis.experience_level}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{analysis.analysis.overview}</p>
              </div>

              {/* Row 3: Strengths & Weaknesses (The Array Lists) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ListCard title="Strengths" items={analysis.analysis.strengths} icon="✅" bgColor="bg-green-50" textColor="text-green-800" />
                <ListCard title="Areas for Improvement" items={analysis.analysis.weaknesses} icon="❌" bgColor="bg-red-50" textColor="text-red-800" />
              </div>

              {/* Row 4: Keywords Analysis */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Keywords Analysis</h3>
                <div className="space-y-6">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-3 block">FOUND IN RESUME</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.found_keywords.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium italic">#{word}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-3 block">MISSING KEYWORDS</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.missing_keywords.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">+ {word}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Career Roadmap & Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ListCard title="Suggested Job Roles" items={analysis.analysis.suggested_job_roles} icon="💼" bgColor="bg-blue-50" textColor="text-blue-800" />
                <ListCard title="Skills to Learn" items={analysis.analysis.recommended_skills_to_learn} icon="🧠" bgColor="bg-indigo-50" textColor="text-indigo-800" />
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>💡</span> Final Improvement Roadmap
                </h3>
                <ul className="space-y-3">
                  {analysis.analysis.resume_improvements_suggestions.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-blue-50 text-sm bg-white/10 p-3 rounded-lg border border-white/10">
                      <span className="font-bold">{i + 1}.</span> {tip}
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

// Reusable List Card Component for Array Data
function ListCard({ title, items, icon, bgColor, textColor }: { title: string, items: string[], icon: string, bgColor: string, textColor: string }) {
  return (
    <div className={`${bgColor} p-6 rounded-2xl border border-black/5 h-full`}>
      <h4 className={`${textColor} font-bold mb-4 flex items-center gap-2`}>
        <span>{icon}</span> {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`text-sm ${textColor} opacity-90 flex items-start gap-2`}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ScoreBadge Component (Keep as you have it, just styling tweaks)
function ScoreBadge({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-slate-600 font-medium text-sm">{label}</span>
        <span className="font-bold text-slate-800">{score}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`${color} h-2 transition-all duration-1000`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}