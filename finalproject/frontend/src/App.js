import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FlightDetails from "./pages/FlightDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import FlightList from "./components/Flightlist";
import AddFlight from "./components/AddFlight";
import EditFlight from "./components/EditFlight";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/admin" element={<FlightList />} />
        <Route path="/admin/add" element={<AddFlight />} />
        <Route path="/admin/edit/:id" element={<EditFlight />} />
      </Routes>
    </Layout>
  );
}

export default App;