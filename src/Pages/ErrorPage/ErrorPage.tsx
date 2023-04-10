import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let status = <></>;

  if (isRouteErrorResponse(error)) {
    status = <i>{error.status || error.statusText}</i>;
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{status}</p>
    </div>
  );
}