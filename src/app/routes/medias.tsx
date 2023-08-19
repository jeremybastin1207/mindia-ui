import LinesEllipsis from 'react-lines-ellipsis';
import { Media, useListMedias } from '../medias';
import { bytes } from '../utils/bytes';
import { Title } from '../components';

function Medias() {
  const { data: medias, isLoading } = useListMedias();

  return (
    <>
      <Title title="Medias library" />

      <div className="grid grid-cols-5 gap-4">
        {isLoading && <p>Loading...</p>}
        {medias?.map((media: Media, i) => (
          <a
            href={`/media/${media.path
              .substring(1)
              .replace(/(\.\w+)+$/, '')
              .replace(/\//g, '%2F')}`}
            className="max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
          >
            <img
              key={i}
              alt=""
              src={`https://mindia-storage.ams3.digitaloceanspaces.com${media.path}`}
              className="h-45"
            />
            <div className="py-4 px-2">
              <LinesEllipsis
                className="font-semibold mb-2"
                text={media.path}
                maxLine="1"
                ellipsis="..."
                basedOn="letters"
              />
              <p className="text-sm">
                {bytes(media?.content_length, 'b', 'kb').toFixed(2)} KB
              </p>
              <p className="text-sm">{media.content_type}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default Medias;
