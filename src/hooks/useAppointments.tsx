import api from '@/lib/api';
import { useState } from 'react';

export const useAppointments = () => {
    const [loading, setLoading] = useState(false);

    const getAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/appointments');
            return data;
        } finally {
            setLoading(false);
        }
    };

    return { getAppointments, loading };
};