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
    <div>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              JD Match Analysis
            </h1>
            <p className="text-slate-500 mt-2">
              Compare your resume against a specific job role.
            </p>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* File Upload */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-4 text-center">
                Upload Resume
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer relative">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files) setFile(e.target.files[0]);
                  }}
                />
                <span className="text-4xl">📄</span>
                <p className="text-sm text-slate-500 mt-2">
                  {file ? file.name : "Select PDF"}
                </p>
              </div>
            </div>

            {/* Job Description Input */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Paste Job Description
              </label>
              <textarea
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                placeholder="Paste the target job requirements here..."
                value={jd}
                onChange={(e) => setJD(e.target.value)}
              />
              <button
                onClick={handleUpload}
                disabled={loading || !file || !jd}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all 
                ${loading || !file || !jd ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700 shadow-lg active:scale-95"}`}
              >
                {loading ? "Analyzing Alignment..." : "Check Match Score"}
              </button>
            </div>
          </div>

          {/* Result Dashboard */}
          {matchResult && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Top Row: Score & Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <span className="text-slate-500 font-medium text-sm mb-2">
                    MATCH SCORE
                  </span>
                  <div className="text-5xl font-black text-blue-600">
                    {matchResult.analysis.ATS_score}
                    <span className="text-xl text-slate-300">/100</span>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2">
                    Analysis Overview
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {matchResult.analysis.overview}
                  </p>
                </div>
              </div>

              {/* Middle Row: Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="text-green-800 font-bold flex items-center mb-3">
                    <span className="mr-2">✅</span> Key Strengths
                  </h4>
                  <p className="text-green-700 text-sm">
                    {matchResult.analysis.strengths}
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <h4 className="text-red-800 font-bold flex items-center mb-3">
                    <span className="mr-2">❌</span> Areas for Improvement
                  </h4>
                  <p className="text-red-700 text-sm">
                    {matchResult.analysis.weaknesses}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Keywords & Suggestions */}
              {/* Bottom Row: Keywords & Suggestions */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                    <span className="mr-2">✨</span> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.keywords.missing_keywords.length > 0 ? (
                      matchResult.keywords.missing_keywords.map((word, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm"
                        >
                          + {word}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-green-600 font-medium italic">
                        No missing keywords found. Great job!
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-3">
                    Improvement Suggestions
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    "{matchResult.analysis.resume_improvements_suggestions}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
