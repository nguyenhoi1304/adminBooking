import Addroomnew from "../../components/addnewroom/Addroomnew";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AddRoom.scss";

const AddRoom = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Addroomnew />
      </div>
    </div>
  );
};

export default AddRoom;
