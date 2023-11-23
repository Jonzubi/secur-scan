import { getRequests } from '../api/request';
import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '../store/userStore';
import { IGetRequest } from '../api/interfaces/request';

export const useRequests = () => {
  const [data, setData] = useState<IGetRequest[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { access_token } = useUserStore();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRequests(access_token);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [access_token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};
