import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ResumeIQ
        </div>
        <Link to='/register' className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition">SIgn Up</Link>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center pt-20 pb-16 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Beat the bot. <br />
          <span className="text-blue-600">Land the interview.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          ResumeIQ uses advanced AI to analyze your resume against industry-standard ATS algorithms. Get your score in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition">
            Analyze My Resume
          </button>
          <button className="bg-white border border-slate-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition">
            View Sample Report
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-2xl">📊</div>
            <h3 className="text-xl font-bold">ATS Scoring</h3>
            <p className="text-slate-500">See exactly how a tracking system ranks your resume based on keyword density and formatting.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 text-2xl">🔍</div>
            <h3 className="text-xl font-bold">Smart Overview</h3>
            <p className="text-slate-500">Get a high-level summary of your professional persona and key strengths as seen by AI.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-2xl">💡</div>
            <h3 className="text-xl font-bold">Fix Suggestions</h3>
            <p className="text-slate-500">Actionable advice on how to improve your bullet points and highlight your impact.</p>
          </div>
        </div>
      </section>
    </div>
  );
}