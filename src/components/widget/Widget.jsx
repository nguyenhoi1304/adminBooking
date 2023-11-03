import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import useFetchApi from "../../use-hook/useFetchApi";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [amountUser, setAmountUser] = useState();
  const [amountOrders, setAmountOrders] = useState();
  let data1;

  useEffect(() => {
    axios
      .get("https://booking-backend-s33n.onrender.com/api/users")
      .then((res) => setAmountUser(res.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://booking-backend-s33n.onrender.com/api/transaction/transaction-latest"
      )
      .then((res) => setAmountOrders(res.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const number = [];
  amountOrders?.map((item) => {
    return number.push(item.price);
  });
  // Số lượng users
  const countUsers = amountUser?.length;

  // Số lượng order
  const countOrders = amountOrders?.length;

  //Tổng số danh thu
  const totalRevenue =
    number.length > 0 && number?.reduce((cur, prev) => cur + prev);

  //danh thu TB hằng tháng
  const AverageRevenue = (totalRevenue / 30).toFixed(3);

  switch (type) {
    case "user":
      data1 = {
        title: "USERS",
        isMoney: false,
        countUsers: countUsers,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data1 = {
        title: "ORDERS",
        countOrders: countOrders,
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data1 = {
        title: "EARNINGS",
        totalRevenue: totalRevenue,
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data1 = {
        title: "BALANCE",
        AverageRevenue: AverageRevenue,
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data1.title}</span>
        <span className="counter">
          {data1.isMoney && "$"} {data1.countUsers} {data1.countOrders}{" "}
          {data1.totalRevenue} {data1.AverageRevenue}
        </span>
        <span className="link">{data1.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive"></div>
        {data1.icon}
      </div>
    </div>
  );
};

export default Widget;
