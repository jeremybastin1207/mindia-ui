import './app.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useGetSpaceUsage } from './space_usage';
import Medias from './routes/medias';
import { bytes } from './utils/bytes';
import NamedTransformations from './routes/named_transformations';
import Settings from './routes/settings';
import { Nav } from './modules/Nav';

const queryClient = new QueryClient();

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="grid grid-cols-12 h-screen w-screen">
          <div className="col-span-2 bg-zinc-100 border-r border-zinc-200 p-8">
            <Nav />
          </div>
          <div className="col-span-10 p-12">
            <Routes>
              <Route path="/" element={<Medias />} />
              <Route
                path="/named_transformations"
                element={<NamedTransformations />}
              />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
