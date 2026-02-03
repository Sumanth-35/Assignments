import React from "react";
import ErrorBoundary from "./Error_Bound";
import ErrorComp1 from "./Errorcomp1";
import Comp2 from "./Comp2";
import ErrorComp3 from "./Errorcomp3";

function App() {
  return (
    <div>
      <ErrorBoundary><ErrorComp1 /></ErrorBoundary>
      <ErrorBoundary><Comp2 /></ErrorBoundary>

      <ErrorBoundary>
        <ErrorComp3 />
      </ErrorBoundary>
    </div>
  );
}

export default App;


