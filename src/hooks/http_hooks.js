import React, { useState, useCallback } from 'react';
import restAPI from '../axios-instances';

export const useRestAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async config => {
        let data = null;
        try {
            setLoading(true);
            const res = await restAPI(config);
            data = res.data;
            setError(null);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
        return data
    },[]);

    return [sendRequest, loading, error];
};
