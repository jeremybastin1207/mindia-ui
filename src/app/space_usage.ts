import { useQuery } from '@tanstack/react-query';
import { float } from 'aws-sdk/clients/lightsail';
import { axiosClient } from './axios';

export type SpaceUsage = {
  total_space_usage: float;
  file_space_usage: float;
  cache_space_usage: float;
};

export const useGetSpaceUsage = () => {
  return useQuery({
    queryKey: ['space_usage'],
    queryFn: () =>
      axiosClient
        .get('/analytics/space', {
          headers: { Authorization: 'Bearer masterKey' },
        })
        .then(({ data }) => data),
  });
};
