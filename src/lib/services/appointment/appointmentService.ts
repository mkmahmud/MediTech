import api from "../../api";

export const appointmentService = {

    // create appointment
    createAppointment: async (appointmentData: any) => {
        const response = await api.post("/appointments/create-appointment", appointmentData);
        return response.data;
    },

    // get appointments by patient id
    getAppointmentsByPatientId: async (patientId: string) => {
        const response = await api.get(`/appointments/get-appointments-by-patient-id?patientId=${patientId}`);
        return response.data;
    },

    // get appointments by doctor id
    getAppointmentsByDoctorId: async (doctorId: string) => {
        const response = await api.get(`/appointments/get-appointments-by-doctor-id?doctorId=${doctorId}`);
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
};