import Hotelall from "../../components/hotelall/Hotelall";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Hotels.scss";

const Hotels = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Hotelall />
      </div>
    </div>
  );
};

export default Hotels;
