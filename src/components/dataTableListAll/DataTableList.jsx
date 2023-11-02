import React, { useState } from "react";

const DataTableList = (props) => {
  const { data, tables, getIdDelete } = props;
  const [idRoom, setIdRoom] = useState("");

  const handleDelete = () => {
    getIdDelete(idRoom);
  };
  return (
    <table className="table">
      <tr>
        {tables?.map((item) => (
          <th>{item}</th>
        ))}
      </tr>
      {data?.map((item, index) => (
        <tr key={index}>
          <>
            <td>{item._id}</td>
            <td>{item.title}</td>
            <td>{item.desc}</td>
            <td>${item.price}</td>
            <td>{item.maxPeople}</td>
            <td>
              <button
                className="btn_delete"
                onClick={() => {
                  setIdRoom(item._id);
                  handleDelete();
                }}
              >
                Delete
              </button>
            </td>
          </>
        </tr>
      ))}
    </table>
  );
};

export default DataTableList;
