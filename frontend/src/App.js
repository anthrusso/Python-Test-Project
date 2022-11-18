import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Home from "./pages/index"

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
