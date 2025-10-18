import Login from "./componenets/Login";
import Signup from "./componenets/Signup";
import Home from "./componenets/Home";
import PrivateRoute from "./componenets/PrivateRoute";
import CreatePitch from "./componenets/CreatePitch";
import GeneratedPitch from "./componenets/GeneratedPitch";
import Dashboard from "./componenets/Dashboard"; // 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/CreatePitch" element={<PrivateRoute><CreatePitch/></PrivateRoute>} />
          <Route path="/GeneratedPitch" element={<PrivateRoute><GeneratedPitch/></PrivateRoute>} />
          <Route path="/Home" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>
  }
/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
