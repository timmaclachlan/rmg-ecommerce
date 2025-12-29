import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ProductErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>{error.status}</h2>
        <p>{error.data?.message}</p>
      </div>
    );
  }

  return <p>Unexpected error loading product.</p>;
}
