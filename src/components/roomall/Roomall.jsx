import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Roomall.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Roomall = () => {
  const tables = [
    "Id",
    "Title",
    "Description",
    "Price",
    "Max People",
    "Action",
  ];
  const [dataList, setDataList] = useState([]);

  //Lấy dữ liệu ra 1 lần để hiển thị
  useEffect(() => {
    const getRooms = async () => {
      await axios
        .get(`https://booking-backend-s33n.onrender.com/api/rooms`)
        .then((res) => setDataList(res.data));
    };
    getRooms();
  }, []);

  function handleDelete(_id) {
    if (window.confirm("Bạn chắc chắn muốn xóa phòng này")) {
      // xóa ở phía client
      const newData = dataList.filter((item) => item._id !== _id);
      // xóa ở phía sever
      const deleteHotel = async () => {
        await axios.delete(
          `https://booking-backend-s33n.onrender.com/api/rooms/${_id}`
        );
      };
      deleteHotel();
      //cập nhật dữ liệu mới đã xóa
      setDataList(newData);
    }
  }

  return (
    <>
      <section style={{ marginTop: "50px" }}>
        <hr />
        <div className="title-hotel">
          <h1>Rooms List</h1>
          <NavLink to="/add-room">
            <button className="btn-add">Add New</button>
          </NavLink>
        </div>
        <table className="table">
          <tr>
            {tables?.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
          <>
            {dataList?.map((item, index) => (
              <tr key={index}>
                <>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>${item.price}</td>
                  <td>{item.maxPeople}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn_delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <NavLink to={`/rooms/edit/${item._id}`}>
                        <button className="btn_edit">Edit</button>
                      </NavLink>
                    </div>
                  </td>
                </>
              </tr>
            ))}
          </>
        </table>
      </section>
    </>
  );
};

export default Roomall;
