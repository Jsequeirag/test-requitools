import "./App.css";
import routes from "./routes/Routes";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav/Nav";
function App() {
  let location = useLocation().pathname;
  const pageRoutes = routes.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });
  return (
    <div>
      {location === "/login" ? null : <Nav />}
      {<Routes>{pageRoutes}</Routes>}
    </div>
  );
}
export default App;
