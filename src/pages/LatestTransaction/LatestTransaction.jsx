import { useEffect, useState } from "react";
import Datatable from "../../components/datastable/DataTable";
import "./LatestTransaction.scss";
import axios from "axios";

const LatestTransaction = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getTransaction = async () => {
      await axios
        .get(
          "https://booking-backend-s33n.onrender.com/api/transaction/transaction-latest"
        )
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getTransaction();
  }, []);
  console.log(data);

  return (
    <div className="listContainer">
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Latest Transactions
      </h1>
      <Datatable data={data} />
    </div>
  );
};

export default LatestTransaction;
