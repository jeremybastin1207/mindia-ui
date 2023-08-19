import { useQuery } from '@tanstack/react-query';
import { axiosClient } from './axios';

export type Media = {
  path: string;
  content_type: string;
  content_length: number;
};

export const useListMedias = () => {
  return useQuery<Media[]>({
    queryKey: ['medias'],
    queryFn: () =>
      axiosClient
        .get('/files/houses?offset=0&limit=20&sort_by=created_at:desc', {
          headers: { Authorization: 'Bearer masterKey' },
        })
        .then(({ data }) => data),
  });
};
