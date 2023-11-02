import Sidebar from "../../components/sidebar/Sidebar";
import Usersall from "../../components/userall/Usersall";
import "./Users.scss";

const Users = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Usersall />
      </div>
    </div>
  );
};

export default Users;
