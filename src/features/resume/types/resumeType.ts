interface ResumeMatch {
    ATS_score: number;
    overview: string;
    strengths: string[];
    weaknesses: string[];
    suggested_job_roles: string[];
    resume_improvements_suggestions: string[];
    recommended_skills_to_learn: string[];
}

interface ResumeAnalysis {
    ATS_score: number;
    overview: string;
    strengths: string[];
    weaknesses: string[];
    suggested_job_roles: string[];
    resume_improvements_suggestions: string[];
    recommended_skills_to_learn: string[];
    skill_score: number;
    experience_score: number;
    experience_level: string;
}

interface Keywords {
    found_keywords: string[];
    missing_keywords: string[];
}

export interface MatchResume {
    message: string;
    analysis: ResumeMatch;
    keywords: Keywords;
}

export interface AnalysisResume {
    message: string;
    analysis: ResumeAnalysis;
    keywords: Keywords;
}
