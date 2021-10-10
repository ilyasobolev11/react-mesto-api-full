import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({component: Component, loggedIn, initialLoad, ...props}) {

  if (initialLoad) return (<></>);

  return (
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
