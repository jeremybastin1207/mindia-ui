import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type NamedTransformation = {
  name: string;
  transformations: string;
};

export const useListNamedTransformations = () => {
  return useQuery({
    queryKey: ['named_transformations'],
    queryFn: () =>
      axios
        .get('http://localhost:3500/v0/named_transformation', {
          headers: { Authorization: 'Bearer masterKey' },
        })
        .then(({ data }) => data),
  });
};
