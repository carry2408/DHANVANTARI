// API Service for HealthVault ID
// Base API URL - Change this to your deployed backend URL
const API_BASE_URL = 'https://healthvault-api-f1d6.onrender.com/api';

// API Service Class
class HealthVaultAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || API_BASE_URL;
    }

    // Helper method for making API requests
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, defaultOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error: error.message };
        }
    }

    // Health Check
    async checkHealth() {
        return await this.makeRequest('/health');
    }

    // Patient APIs
    async getPatient(healthId) {
        return await this.makeRequest(`/patients/${healthId}`);
    }

    async createPatient(patientData) {
        return await this.makeRequest('/patients', {
            method: 'POST',
            body: JSON.stringify(patientData)
        });
    }

    async updatePatient(healthId, patientData) {
        return await this.makeRequest(`/patients/${healthId}`, {
            method: 'PUT',
            body: JSON.stringify(patientData)
        });
    }

    // Report APIs
    async getReports(healthId) {
        return await this.makeRequest(`/reports/patient/${healthId}`);
    }

    async createReport(reportData) {
        return await this.makeRequest('/reports', {
            method: 'POST',
            body: JSON.stringify(reportData)
        });
    }

    async updateReport(reportId, reportData) {
        return await this.makeRequest(`/reports/${reportId}`, {
            method: 'PUT',
            body: JSON.stringify(reportData)
        });
    }

    async deleteReport(reportId) {
        return await this.makeRequest(`/reports/${reportId}`, {
            method: 'DELETE'
        });
    }

    // Medical Condition APIs
    async getConditions(healthId) {
        return await this.makeRequest(`/patients/${healthId}/conditions`);
    }

    async addCondition(healthId, conditionData) {
        return await this.makeRequest(`/patients/${healthId}/conditions`, {
            method: 'POST',
            body: JSON.stringify(conditionData)
        });
    }

    async deleteCondition(healthId, conditionId) {
        return await this.makeRequest(`/patients/${healthId}/conditions/${conditionId}`, {
            method: 'DELETE'
        });
    }

    // Allergy APIs
    async getAllergies(healthId) {
        return await this.makeRequest(`/patients/${healthId}/allergies`);
    }

    async addAllergy(healthId, allergyData) {
        return await this.makeRequest(`/patients/${healthId}/allergies`, {
            method: 'POST',
            body: JSON.stringify(allergyData)
        });
    }

    async deleteAllergy(healthId, allergyId) {
        return await this.makeRequest(`/patients/${healthId}/allergies/${allergyId}`, {
            method: 'DELETE'
        });
    }

    // File Upload (multipart/form-data)
    async uploadFile(formData) {
        const url = `${this.baseUrl}/upload`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
                // Don't set Content-Type for FormData, browser will set it with boundary
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Upload Error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Create and export API instance
const api = new HealthVaultAPI();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HealthVaultAPI, api, API_BASE_URL };
}
