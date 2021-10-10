import { Redirect, Route } from "react-router";

function PreLoginRoute({component: Component, loggedIn, ...props}) {

  return (
    <Route>
      { loggedIn ? <Redirect to='/' /> : <Component {...props} />}
    </Route>
  );
}

export default PreLoginRoute;
