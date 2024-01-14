import React from "react";
import BlogList from "./blogList.jsx";

function App() {
  return (
    // Wrapping the BlogList component in React.StrictMode for additional checks
    <React.StrictMode>
      <BlogList />
    </React.StrictMode>
  );
}

// Export the App component
export default App;