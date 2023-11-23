import { getRequests } from 'api/request';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { IGetRequest } from 'api/interfaces/request';

export const useRequests = () => {
  const [data, setData] = useState<IGetRequest[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { access_token } = useUserStore();

  useEffect(() => {
    (async function () {
      try {
        const response = await getRequests(access_token);
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};
