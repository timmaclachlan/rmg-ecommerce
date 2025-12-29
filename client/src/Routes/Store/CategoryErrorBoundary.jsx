import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function CategoryErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>Problem finding category</h2>
        <h2>{error.status}</h2>
        <p>{error.data?.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Unexpected Error</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre> {/* ✅ Safe debug output */}
    </div>
  );
}
