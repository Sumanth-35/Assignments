import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");
  const [terms, setTerms] = useState(false);

  const [submittedData, setSubmittedData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData({
      name,email, age,course,gender,
    });

    setName("");
    setEmail("");
    setAge("");
    setCourse("");
    setGender("");
    setTerms(false);
  };

  const isFormValid =
    name && email && age && course && gender && terms;

    

  return (
    <div style={{ width: "400px", border: "2px solid black", padding: "20px" }}>
      <h2>Student Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Student Name */}
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        {/* {!name && <p style={{ color: "red" }}>Name is required</p>} */}

        {/* Email */}
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        {/* {!email && <p style={{ color: "red" }}>Email is required</p>} */}

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br/>
        {/* {!age && <p style={{ color: "red" }}>Age is required</p>} */}

        {/* Course */}
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          <option>React</option>
          <option>Angular</option>
          <option>Vue</option>
        </select>
        <br/>

        {/* Gender */}
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          /> Male

          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          /> Female
        </div>
        <br/>
        {/* {!gender && <p style={{ color: "red" }}>Gender is required</p>} */}

        {/* Terms */}
        <div>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          Accept Terms & Conditions
        </div>
        <br/>
        {/* {!terms && <p style={{ color: "red" }}>Accept terms</p>} */}

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div>
          <h3>Entered Details</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Course: {submittedData.course}</p>
          <p>Gender: {submittedData.gender}</p>
        </div>
      )}
    </div>
  );
}

export default App;

