import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Hotels from "./pages/hotels/Hotels";
import Addhotel from "./pages/addHotel/Addhotel";
import Rooms from "./pages/rooms/Rooms";
import AddRoom from "./pages/addRoom/AddRoom";
import Transaction from "./pages/transaction/Transaction";
import Users from "./pages/users/Users";
import Editroom from "./components/editRoom/Editroom";
import EditHotel from "./components/editHotel/EditHotel";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users">
              <Route index element={<Users />} />
            </Route>
            <Route path="/transaction">
              <Route index element={<Transaction />} />
            </Route>
            <Route path="/hotels">
              <Route index element={<Hotels />} />
            </Route>
            <Route path="/hotels/edit/:hotelId">
              <Route index element={<EditHotel />} />
            </Route>
            <Route path="/add-hotel">
              <Route index element={<Addhotel />} />
            </Route>
            <Route path="/rooms">
              <Route index element={<Rooms />} />
            </Route>
            <Route path="/rooms/edit/:roomId">
              <Route index element={<Editroom />} />
            </Route>
            <Route path="/add-room">
              <Route index element={<AddRoom />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
