import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/private-route";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Layout />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
