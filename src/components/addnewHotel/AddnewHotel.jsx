import React, { useEffect, useState } from "react";
import "./AddnewHotel.scss";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import useFetchApi from "../../use-hook/useFetchApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
const AddnewHotel = () => {
  const outerTheme = useTheme();
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });
  const [featured, setFeatured] = useState("");
  const [rooms, setRooms] = useState([]);
  const [dataValue, setDataValue] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    cheapestPrice: "",
  });

  const navigation = useNavigate("");
  //Xử lý selectOptions multiple rooms
  const handleChangeRooms = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const { data } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/rooms"
  );

  //Xử lý selectOptions Featured
  const handleChangeFeatured = (event) => {
    setFeatured(event.target.value);
  };

  // xử lý upload ảnh
  const handleImg = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setImages({ ...images, [name]: value });
  };

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
      data.name.trim() === "" ||
      data.type.trim() === "" ||
      data.city.trim() === "" ||
      data.address.trim() === "" ||
      data.title.trim() === "" ||
      data.distance.trim() === "" ||
      data.desc.trim() === "" ||
      data.cheapestPrice.trim() === "" ||
      featured.trim() === "" ||
      // images.length === 0 ||
      rooms.length === 0
    ) {
      isValidate = false;
    } else {
      isValidate = true;
    }
    return isValidate;
  }

  const newHotel = {
    ...dataValue,
    rooms,
    photos: [images.img1, images.img2, images.img3, images.img4, images.img5],
    featured,
    rating: Math.floor(Math.random() * 5),
  };

  //xử lý gửi dữ liệu đi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      axios
        .post("https://booking-backend-s33n.onrender.com/api/hotels", newHotel)
        .then(function (response) {
          if (response.data) {
            alert("tạo hotel thành công");
            navigation("/hotels");
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
        Add New Hotel
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
              label="Name"
              name="name"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.name}
            />
            <TextField
              label="Type"
              name="type"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.type}
            />
            <TextField
              label="City"
              name="city"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.city}
            />
            <TextField
              label="Address"
              name="address"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.address}
            />
            <TextField
              label="Distance from City Center"
              name="distance"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.distance}
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
              name="cheapestPrice"
              variant="standard"
              onChange={handleChangeValues}
              value={dataValue.cheapestPrice}
            />
          </ThemeProvider>
          <section>
            <p>
              <label htmlFor="inputField" className="upload_img">
                Upload link Image here!
              </label>
            </p>

            <div>
              <p>Image1</p>
              <input
                name="img1"
                className="input_image"
                onChange={handleImg}
                value={images.img1}
              />
              <img src={images.img1} alt="" className="imgUrl_hotel" />
              <p>Image2</p>
              <input
                name="img2"
                className="input_image"
                onChange={handleImg}
                value={images.img2}
              />
              <img src={images.img2} alt="" className="imgUrl_hotel" />
              <p>Image3</p>
              <input
                name="img3"
                className="input_image"
                onChange={handleImg}
                value={images.img3}
              />
              <img src={images.img3} alt="" className="imgUrl_hotel" />

              <p>Image4</p>
              <input
                name="img4"
                className="input_image"
                onChange={handleImg}
                value={images.img4}
              />
              <img src={images.img4} alt="" className="imgUrl_hotel" />

              <p>Image5</p>
              <input
                name="img5"
                className="input_image"
                onChange={handleImg}
                value={images.img5}
              />
              <img src={images.img5} alt="" className="imgUrl_hotel" />
            </div>
          </section>
          <section>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Featured</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={featured}
                  label="Featured"
                  onChange={handleChangeFeatured}
                >
                  <MenuItem value={"true"}>True</MenuItem>
                  <MenuItem value={"false"}>False</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </section>
          <div className="selectRooms">
            <p>
              <label>Rooms</label>
            </p>
            <select id="rooms" multiple onChange={handleChangeRooms}>
              {data?.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.title}
                </option>
              ))}
            </select>
          </div>
        </Box>

        <button className="btn_submit" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default AddnewHotel;
