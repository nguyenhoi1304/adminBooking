import { useEffect, useState } from "react";
import Datatable from "../../components/datastable/DataTable";
import "./Transaction.scss";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const Transaction = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getTransaction = async () => {
      await axios
        .get("http://localhost:5000/api/transaction")
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getTransaction();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Transactions</h1>
        {data && <Datatable data={data} />}
      </div>
    </div>
  );
};

export default Transaction;
