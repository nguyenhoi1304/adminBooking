import Roomall from "../../components/roomall/Roomall";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Rooms.scss";

const Rooms = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Roomall />
      </div>
    </div>
  );
};

export default Rooms;
