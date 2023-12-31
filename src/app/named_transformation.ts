import { useQuery } from '@tanstack/react-query';
import { axiosClient } from './axios';

export type NamedTransformation = {
  name: string;
  transformations: string;
};

export const useListNamedTransformations = () => {
  return useQuery({
    queryKey: ['named_transformations'],
    queryFn: () =>
      axiosClient
        .get('/v0/named_transformation', {
          headers: { Authorization: 'Bearer masterKey' },
        })
        .then(({ data }) => data),
  });
};
