import {
  NamedTransformation,
  useListNamedTransformations,
} from '../named_transformation';

function NamedTransformations() {
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
}

export default NamedTransformations;
