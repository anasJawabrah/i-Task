import Login from "./login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />

          <Redirect to="/login" />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
