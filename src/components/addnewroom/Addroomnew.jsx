import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import "./Addroomnew.scss";
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

const Addroomnew = () => {
  const outerTheme = useTheme();
  const [roomId, setRoomId] = useState();
  const [rooms, setRooms] = useState([]);
  const [dataValue, setDataValue] = useState({
    maxPeople: "",
    title: "",
    desc: "",
    price: "",
  });

  const navigation = useNavigate("");

  const { data } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/hotels/allhotel"
  );

  //Xử lý lấy value theo name
  const handleChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataValue({ ...dataValue, [name]: value });
  };

  //Xử lý người dùng nhập không để trống
  const validate = validateData(dataValue);

  function validateData(data) {
    let isValidate = true;
    if (
      data.maxPeople.trim() === "" ||
      data.desc.trim() === "" ||
      data.price.trim() === "" ||
      data.title.trim() === ""
    ) {
      isValidate = false;
    } else {
      isValidate = true;
    }
    return isValidate;
  }

  //xử lý gửi dữ liệu đi
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomNumbers = rooms?.split(",");
    console.log(roomNumbers);
    if (validate) {
      axios
        .post(`https://booking-backend-s33n.onrender.com/api/rooms/${roomId}`, {
          ...dataValue,
          roomNumbers,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data) {
            alert("tạo room thành công");
            navigation("/rooms");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Vui lòng kiểm tra lại, không được để trống!");
    }
  };
  return (
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
              label="Max People"
              name="maxPeople"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.maxPeople}
            />
            <TextField
              label="Title"
              name="title"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.title}
            />
            <TextField
              label="Description"
              name="desc"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.desc}
            />
            <TextField
              label="Price"
              name="price"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.price}
            />
          </ThemeProvider>
          <section>
            <div>
              <p>Rooms</p>
              <textarea
                onChange={(e) => setRooms(e.target.value)}
                placeholder="give comma between room numbers."
              />
            </div>
          </section>
          <section>
            <div className="formInput">
              <p>
                <label>Choose a hotel</label>
              </p>
              <select id="hotelId" onChange={(e) => setRoomId(e.target.value)}>
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
          Send
        </button>
      </form>
    </div>
  );
};

export default Addroomnew;
