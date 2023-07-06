import './app.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LinesEllipsis from 'react-lines-ellipsis';
import {
  NamedTransformation,
  useListNamedTransformations,
} from './named_transformation';
import { Media, useListMedias } from './medias';
import { useGetSpaceUsage } from './space_usage';

const queryClient = new QueryClient();

const NamedTransformations = () => {
  const { data: named_transformations, isLoading } =
    useListNamedTransformations();

  if (isLoading) {
    return 'loading...';
  }

  return (
    <div>
      {named_transformations?.map(
        (named_transformation: NamedTransformation) => (
          <div>{named_transformation.name}</div>
        )
      )}
    </div>
  );
};

const Medias = () => {
  const { data: medias, isLoading } = useListMedias();

  if (isLoading) {
    return 'loading...';
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {medias?.map((media: Media, i) => (
        <div className="border border-zinc-300">
          <img
            key={i}
            alt=""
            src={`http://localhost:3500/v0/download/${media.path}`}
          />
          <div className="p-2">
            <LinesEllipsis
              className="font-semibold"
              text={media.path}
              maxLine="1"
              ellipsis="..."
              basedOn="letters"
            />
            <p>{bytes(media?.content_length, 'b', 'kb').toFixed(2)} KB</p>
            <p>{media.content_type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const menu = [
  {
    label: 'Medias',
  },
  {
    label: 'Named transformations',
  },
  {
    label: 'Api keys',
  },
  {
    label: 'Settings',
  },
];

function bytes(value = 1, from = 'mb', to = 'b') {
  const bytes = {
    b: 1,
    kb: 2,
    mb: 3,
    gb: 4,
    tb: 5,
    pb: 6,
    eb: 7,
    zb: 8,
    yb: 9,
  };
  let a = bytes[from],
    b = bytes[to];
  if (a > b) for (let i = 0; i < a - b; i++) value *= 1024;
  else for (let i = 0; i < b - a; i++) value /= 1024;
  return value;
}

const SpaceUsage = () => {
  const { data: spaceUsage } = useGetSpaceUsage();

  return (
    <div className="flex gap-8 py-2 px-4 bg-zinc-100">
      <span className="text-sm">
        Total: {bytes(spaceUsage?.total_space_usage, 'b', 'mb').toFixed(2)} MB
      </span>
      <span className="text-sm">
        Storage: {bytes(spaceUsage?.file_space_usage, 'b', 'mb').toFixed(2)} MB
      </span>
      <span className="text-sm">
        Cache: {bytes(spaceUsage?.cache_space_usage, 'b', 'mb').toFixed(2)} MB
      </span>
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-2 border-r border-gray-200">
          <div className="h-12 px-4 border-b border-gray-200 flex items-center">
            <span className="font-bold">Mindia</span>
          </div>
          <div className="p-4">
            <ul>
              {menu?.map((item) => (
                <li key={item.label} className="py-4 text-zinc-600">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-10 ">
          <div className="flex flex-col h-screen">
            <div className="h-12 border-b border-gray-200"></div>
            <div className="flex flex-col justify-between grow">
              <div className="p-4">
                <Medias />
              </div>
            </div>
            <SpaceUsage />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
