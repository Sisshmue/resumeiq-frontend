import { useState } from "react";
import { analyzeResume } from "../services/resumeApi";
import type { AnalysisResume } from "../types/resumeType";

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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Resume <span className="text-blue-600">Analyzer</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Upload your resume and let our AI evaluate your professional standing.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition-colors group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <label className="cursor-pointer text-center">
              <span className="text-blue-600 font-semibold hover:text-blue-700">Click to upload</span>
              <span className="text-slate-500"> or drag and drop</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files) setFile(e.target.files[0]);
                }}
              />
              <p className="text-xs text-slate-400 mt-2">PDF, DOC, or DOCX (max. 5MB)</p>
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
            className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg
              ${!file || isAnalyzing 
                ? "bg-slate-300 cursor-not-allowed shadow-none" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200"}`}
          >
            {isAnalyzing ? "Analyzing Resume..." : "Start Analysis"}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Score Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-sm">ATS Score</h3>
              <div className="text-6xl font-black text-blue-600">
                {analysis.analysis.ATS_score}<span className="text-2xl text-slate-300">/100</span>
              </div>
              <p className="mt-4 text-slate-500 text-center text-sm">
                Your resume is {analysis.analysis.ATS_score > 70 ? "well-optimized" : "needs some work"} for automated systems.
              </p>
            </div>

            {/* Sub-scores Grid */}
            <div className="grid grid-cols-1 gap-4">
              <ScoreBadge label="Skill Score" score={analysis.analysis.skill_score} color="bg-indigo-600" />
              <ScoreBadge label="Experience Score" score={analysis.analysis.experience_score} color="bg-purple-600" />
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Experience Level</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm uppercase">
                   {analysis.analysis.experience_level}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Component for the list items
function ScoreBadge({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-bold">{score}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-1000`} 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}