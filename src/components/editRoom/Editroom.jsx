import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  TextField,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import useFetchApi from "../../use-hook/useFetchApi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Editroom.scss";
import Sidebar from "../sidebar/Sidebar";
const customTheme = () =>
  createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const Editroom = () => {
  const outerTheme = useTheme();
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigate();

  //Nhận id của room bằng useParams
  const { roomId } = useParams();

  const [dataValue, setDataValue] = useState({
    maxPeople: "",
    title: "",
    desc: "",
    price: "",
  });

  const { data } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/hotels/allhotel"
  );

  //Lấy dữ liệu ra 1 lần để hiển thị
  useEffect(() => {
    const getRooms = async () => {
      await axios
        .get(`https://booking-backend-s33n.onrender.com/api/rooms/${roomId}`)
        .then((res) => {
          setDataValue({
            ...res.data,
            maxPeople: res.data.maxPeople,
            title: res.data.title,
            desc: res.data.desc,
            price: res.data.price,
          });
        });
    };
    getRooms();
  }, []);

  //Xử lý lấy value theo name
  const handleChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataValue({ ...dataValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rooms);
    const roomNumbers = rooms?.split(",");
    axios
      .put(`https://booking-backend-s33n.onrender.com/api/rooms/${roomId}`, {
        ...dataValue,
        roomNumbers,
      })
      .then(function (response) {
        if (response.data) {
          navigation("/rooms");
        }
      });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div style={{ padding: "50px" }}>
          <h2 style={{ textTransform: "uppercase", fontWeight: "1.4rem" }}>
            Add New Room
          </h2>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr " },
                gap: 4,
              }}
            >
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  label="maxPeople"
                  name="maxPeople"
                  variant="standard"
                  onChange={handleChangeValues}
                  value={dataValue?.maxPeople}
                />
                <TextField
                  label="title"
                  name="title"
                  variant="standard"
                  onChange={handleChangeValues}
                  value={dataValue?.title}
                />
                <TextField
                  label="desc"
                  name="desc"
                  variant="standard"
                  onChange={handleChangeValues}
                  value={dataValue?.desc}
                />
                <TextField
                  label="price"
                  name="price"
                  variant="standard"
                  onChange={handleChangeValues}
                  value={dataValue?.price}
                />
              </ThemeProvider>
              <section>
                <div>
                  <p>Rooms</p>
                  <p>You need something in here!</p>
                  <textarea
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="give comma between room numbers."
                    defaultValue={dataValue?.roomNumbers}
                  >
                    {dataValue?.roomNumbers ? dataValue?.roomNumbers : rooms}
                  </textarea>
                </div>
              </section>
              <section>
                <div className="formInput">
                  <p>
                    <label>Choose a hotel</label>
                  </p>
                  <select id="hotelId">
                    {data?.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>
            </Box>

            <button className="btn_submit" type="submit">
              Update!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editroom;
