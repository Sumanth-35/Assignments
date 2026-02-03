import React, { useRef } from "react";

function App2() {
  // refs for all inputs
  const nameRef = useRef();
  const courseRef = useRef();
  const feedbackRef = useRef();
  const ratingRef = useRef();
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const course = courseRef.current.value;
    const feedback = feedbackRef.current.value;
    const rating = ratingRef.current.value;

    alert(
      "Student Name: " + name +
      "\nCourse Name: " + course +
      "\nFeedback: " + feedback +
      "\nRating: " + rating
    );

    // reset form using ref
    formRef.current.reset();
  };

  return (
    <div style={{ border: "2px solid black", padding: "20px", width: "400px" }}>
      <h2>Course Feedback Form</h2>

      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          ref={nameRef}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Course Name"
          ref={courseRef}
        />
        <br /><br />

        <textarea
          placeholder="Feedback Message"
          ref={feedbackRef}
        />
        <br /><br />

        <select ref={ratingRef}>
          <option value="">Select Rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <br /><br />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default App2;
