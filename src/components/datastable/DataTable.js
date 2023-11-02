import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataTable.css";

const Datatable = (props) => {
  const data = props.data;

  const tables = [
    "Id",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];

  return (
    <div>
      <section style={{ margin: "0 auto" }}>
        <table className="table">
          <tr>
            {tables.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
          {data?.map((item, index) => (
            <tr key={index}>
              <>
                <td>{item._id}</td>
                <td>{item.user}</td>
                <td>{item.hotel.name}</td>
                <td style={{ padding: "0 10px" }}>
                  {item?.room?.map((item) => (
                    <> [ {item.roomNumbers.join(",")} ]</>
                  ))}
                </td>

                <td>
                  {item.dateStart} - {item.dateEnd}
                </td>
                <td>$ {item.price}</td>
                <td>{item.payment}</td>
                <td
                  className={
                    (item.status === "Checkin" && "Checkin") ||
                    (item.status === "Checkout" && "Checkout") ||
                    (item.status === "Booking" && "Booking")
                  }
                >
                  {item.status}
                </td>
              </>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
};

export default Datatable;
