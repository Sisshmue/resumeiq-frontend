import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link to={'/'} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ResumeIQ
        </Link>
        <Link
          to="/register"
          className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition"
        >
          SIgn Up
        </Link>
      </nav>
    </div>
  );
}
