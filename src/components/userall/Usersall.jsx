import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Usersall.scss";
import useFetchApi from "../../use-hook/useFetchApi";
import { NavLink } from "react-router-dom";

const Usersall = () => {
  const tables = ["Id", "Name", "Password", "Email"];
  const { data, resetFetchApi } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/users"
  );

  return (
    <section style={{ marginTop: "50px" }}>
      <hr />
      <div className="title-hotel">
        <h1>User List</h1>
      </div>
      <table className="table">
        <tr>
          {tables.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
        {data?.map((item, index) => (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>
    </section>
  );
};

export default Usersall;
