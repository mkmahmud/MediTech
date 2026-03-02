import api from "../../api";

export const appointmentService = {

    // create appointment
    createAppointment: async (appointmentData: any) => {
        const response = await api.post("/appointments/create-appointment", appointmentData);
        return response.data;
    },
};