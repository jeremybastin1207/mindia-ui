import './app.module.css';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  NamedTransformation,
  useListNamedTransformations,
} from './named_transformation';

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

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-zinc-700 grid grid-flow-row grid-cols-[70px_1fr] h-screen">
        <div className=""></div>

        <div className="bg-gray-100 rounded-l-lg">
          <div className="container mx-auto max-w-4xl">
            <div className="pt-12">
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg border px-4 py-2 font-semibold ">
                  <FontAwesomeIcon className="mr-1 text-sm" icon={faPlus} />
                  New
                </button>
              </div>
              <div className="mt-4 h-24 bg-white rounded border border-gray-300">
                <NamedTransformations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
