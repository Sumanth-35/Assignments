import React, { useState } from 'react';

function App() {
  const [newInstrument, setNewInstrument] = useState("");

  const showInstrument = () => {
    setNewInstrument("Violin");
  };

  return (
    <div style={{ border: "2px solid black", padding: "20px", width: "300px" }}>
      <p><b>Old Instrument:</b> Drums</p>
      <p><b>New Instrument:</b> {newInstrument}</p>

      <button onClick={showInstrument}>Show</button>
    </div>
  );
}

export default App;

