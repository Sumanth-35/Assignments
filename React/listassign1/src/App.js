import React from "react";

function App() {
  const students = [
    { studid: 1, studname: "Shivam", age: 20, city: "Delhi" },
    { studid: 2, studname: "Sumanth", age: 21, city: "Mumbai" },
    { studid: 3, studname: "Harsha", age: 22, city: "Bangalore" },
    { studid: 4, studname: "Tarak", age: 23, city: "Chennai" }
  ];

  return (
    <div>
      {students.map((student) => (
        <div key={student.studid}>
          <h2>Student Name: {student.studname}</h2>
          <h3>Age: {student.age}</h3>
          <p>City: {student.city}</p>
          {/* <hr /> */}
        </div>
      ))}
    </div>
  );
}

export default App;

