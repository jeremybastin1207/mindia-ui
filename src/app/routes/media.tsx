import { useParams } from 'react-router';
import { Button, Title } from '../components';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../axios';

export const useGetMedia = (path: string) => {
  return useQuery<any>({
    queryKey: ['media'],
    queryFn: () =>
      axiosClient
        .get(`/file${path}`, {
          headers: { Authorization: 'Bearer masterKey' },
        })
        .then(({ data }) => data),
  });
};

function Media() {
  const { path } = useParams();
  const { data: media } = useGetMedia(`/${path}.webp`);

  return (
    <>
      <Title title="Media" />
      <a href="/">
        <Button label="Back" />
      </a>

      <img
        className="max-h-[500px]"
        src={`https://mindia-storage.ams3.digitaloceanspaces.com${media?.path}`}
        alt=""
      />
    </>
  );
}

export default Media;
