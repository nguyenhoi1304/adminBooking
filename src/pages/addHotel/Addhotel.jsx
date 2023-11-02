import AddnewHotel from "../../components/addnewHotel/AddnewHotel";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Addhotel.scss";

const Addhotel = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <AddnewHotel />
      </div>
    </div>
  );
};

export default Addhotel;
