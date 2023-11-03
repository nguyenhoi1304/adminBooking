import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hotelall.scss";
import useFetchApi from "../../use-hook/useFetchApi";
import { NavLink } from "react-router-dom";

const Hotelall = () => {
  const tables = ["Id", "Name", "Type", "Title", "City", "Action"];
  const [idHotel, setIdHotel] = useState("");
  const [dataTransaction, setDataTransaction] = useState("");

  const [dataList, setDataList] = useState([]);

  //Lấy dữ liệu ra 1 lần để hiển thị
  useEffect(() => {
    axios
      .get(`https://booking-backend-s33n.onrender.com/api/hotels/allhotel`)
      .then((res) => setDataList(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`https://booking-backend-s33n.onrender.com/api/transaction`)
      .then((res) => setDataTransaction(res.data));
  }, []);

  function handleDelete(_id) {
    //lọc qua các giao dịch tìm ra các idHotel so với id đang xóa, và trạng thái trong giao dịch là booking, nếu có thì sẽ trả về dữ liệu có nghĩa là  hotel đang có người booking
    const isBooking = dataTransaction?.filter(
      (dataTransactionId) =>
        dataTransactionId.hotel._id === _id &&
        dataTransactionId.status === "Booking"
    );

    if (isBooking.length > 0) {
      alert("Phòng hiện tại đang có người đặt! Vui lòng không xóa!");
    } else {
      if (window.confirm("Bạn chắc chắn muốn xóa phòng này")) {
        // xóa ở phía client
        const newData = dataList.filter((item) => item._id !== _id);
        // xóa ở phía sever
        const deleteHotel = async () => {
          await axios.delete(
            `https://booking-backend-s33n.onrender.com/api/hotels/find/${_id}`
          );
        };
        deleteHotel();
        //cập nhật dữ liệu mới đã xóa
        setDataList(newData);
      }
    }
  }

  return (
    <section style={{ marginTop: "50px" }}>
      <hr />
      <div className="title-hotel">
        <h1>Hotel List</h1>
        <NavLink to="/add-hotel">
          <button className="btn-add">Add New</button>
        </NavLink>
      </div>
      <table className="table">
        <tr>
          {tables.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
        {dataList?.map((item, index) => (
          <tr key={index}>
            <>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.city}</td>
              <td>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn_delete"
                >
                  Delete
                </button>
                <NavLink to={`/hotels/edit/${item._id}`}>
                  <button className="btn_edit">Edit</button>
                </NavLink>
              </td>
            </>
          </tr>
        ))}
      </table>
    </section>
  );
};

export default Hotelall;
