import * as React from "react";
import Dashboard from "./MainLayout/Dashboard";

const App: React.FC = () => {
  const hash = location.hash.replace("#", "");
  return <Dashboard defaultCity={hash === "" ? null : hash} />;
};

export default App;
