import { api } from "../../../shared/services/api";
import type { AnalysisResume } from "../types/resumeType";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const analyzeResume = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post<AnalysisResume>('/api/analyze/resume', formData, {
        headers: {
            ...getAuthHeaders()
        }
    });
    return response.data;
}

export const matchResume = async (file: File, jd: string) => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append('jobDescription', jd)

    const response = await api.post<AnalysisResume>('/api/analyze/match', formData, {
        headers: {
            ...getAuthHeaders()
        }
    });
    return response.data;
}