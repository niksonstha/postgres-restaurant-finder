import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import UpdateRestaurant from "./screens/UpdateRestaurant";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/update" element={<UpdateRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
