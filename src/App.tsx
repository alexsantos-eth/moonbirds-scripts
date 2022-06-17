import React from "react";

// PROVIDERS
import Web3Provider from "./providers/Web3";

// PAGES
import IndexPage from "./pages";

const App: React.FC = () => {
  return (
    <Web3Provider>
      <IndexPage />
    </Web3Provider>
  );
};
export default App;
