import api from "../../api";

export const appointmentService = {

    // create appointment
    createAppointment: async (appointmentData: any) => {
        console.log('Creating appointment with data:', appointmentData);
        const response = await api.post("/appointments/create-appointment", appointmentData);
        return response.data;
    },

    // get appointments by patient id
    getAppointmentsByPatientId: async (patientId: string) => {
        const response = await api.get(`/appointments/get-appointments-by-patient-id?patientId=${patientId}`);
        return response.data;
    },

    // get appointments by doctor id
    getAppointmentsByDoctorId: async (doctorId: string, date: string) => {
        const response = await api.get(`/appointments/get-appointments-by-doctor-id?doctorId=${doctorId}&date=${date}`);
        return response.data;
    },

    // get appointments by doctor id with download option
    getAppointmentsByDoctorIdForDownload: async (doctorId: string, date: string) => {
        const response = await api.get(`/appointments/get-appointments-by-doctor-id?doctorId=${doctorId}&date=${date}&download=true`);
        return response.data;
    },

    // Cancel appointment
    cancelAppointment: async (data: any) => {
        const response = await api.post(`/appointments/cancel-appointment`, data);
        return response.data;
    },

    // Get appointment details by id
    getAppointmentDetailsById: async (appointmentId: string) => {
        const response = await api.get(`/appointments/get-appointment-details/${appointmentId}`);
        return response.data;
    },

    // Complete appointment with diagnosis and notes by Doctor
    completeAppointment: async (data: any) => {
        const response = await api.post(`/appointments/complete-appointment`, data);
        return response.data;
    }
};