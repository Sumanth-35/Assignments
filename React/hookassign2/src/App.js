
import { useState,useEffect } from 'react';

function App() {
          const[Name,setName]=useState("sumanth");
          const[Age,setAge]=useState(22);

          const[Maths,setMaths]=useState(50);
          const[Chemistry,setChemistry]=useState(60);
          const[Physics,setPhysics]=useState(70);

          const[Total,setTotal]=useState(0);

          useEffect( () => {
                setTotal(Maths + Chemistry + Physics);
          },[Maths,Chemistry,Physics]);

          const UpdateMarks = () => {
            setMaths(Maths + 10);
            setChemistry(Chemistry + 10);
            setPhysics(Physics + 10);
          }

   return (
    <div style={{ border: "2px solid black", padding: "20px", width: "350px" }}>
      <h2>Marksheet</h2>

      <p>Name: {Name}</p>
      <p>Age: {Age}</p>

      <p>Maths: {Maths}</p>
      <p>Chemistry: {Chemistry}</p>
      <p>Physics: {Physics}</p>

      <p><b>Total: {Total}</b></p>

      <button onClick={UpdateMarks}>Update</button>
    </div>
  );
}
    


export default App;
