import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hotelall.scss";
import useFetchApi from "../../use-hook/useFetchApi";
import { NavLink } from "react-router-dom";

const Hotelall = () => {
  const tables = ["Id", "Name", "Type", "Title", "City", "Action"];
  const [idHotel, setIdHotel] = useState("");
  const { data, resetFetchApi, loading } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/hotels/allhotel"
  );

  useEffect(() => {
    const deleteHotel = async () => {
      await axios.delete(
        `https://booking-backend-s33n.onrender.com/api/hotels/find/${idHotel}`
      );
    };
    deleteHotel();
  }, []);

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
        {loading ? (
          "Loading"
        ) : (
          <>
            {data?.map((item, index) => (
              <tr key={index}>
                <>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.city}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIdHotel(item._id);
                        if (window.confirm("Bạn chắc chắn muốn xóa")) {
                          resetFetchApi();
                        }
                      }}
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
          </>
        )}
      </table>
    </section>
  );
};

export default Hotelall;
