import React, { useEffect, useState } from "react";
import "./EditHotel.scss";
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
import { useNavigate, useParams } from "react-router-dom";
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
const EditHotel = () => {
  const outerTheme = useTheme();
  const { hotelId } = useParams();
  const [featured, setFeatured] = useState("");
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });
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

  //Lấy dữ liệu ra 1 lần để hiển thị
  useEffect(() => {
    const getRooms = async () => {
      await axios
        .get(
          `https://booking-backend-s33n.onrender.com/api/hotels/find/${hotelId}`
        )
        .then((res) => {
          setDataValue({
            ...res.data,
            name: res.data.name,
            type: res.data.type,
            city: res.data.city,
            address: res.data.address,
            distance: res.data.distance,
            title: res.data.title,
            desc: res.data.desc,
            cheapestPrice: res.data.cheapestPrice,
          });
        });
    };
    getRooms();
  }, []);

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

  //Xử lý lấy value theo name
  const handleChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataValue({ ...dataValue, [name]: value });
  };

  // xử lý upload ảnh
  const handleImg = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setImages({ ...images, [name]: value });
  };

  console.log(dataValue);
  //xử lý gửi dữ liệu đi
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://booking-backend-s33n.onrender.com/api/hotels/${hotelId}`, {
        ...dataValue,
      })
      .then(function (response) {
        if (response.data) {
          navigation("/hotels");
        }
      });
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
            <h3>
              <label htmlFor="inputField" className="upload_img">
                Upload link Image here!
              </label>
            </h3>

            {dataValue.photos?.map((url, index) => (
              <div>
                <p>{`image${index + 1}`}</p>
                <input
                  name={url}
                  className="input_image"
                  onChange={handleImg}
                  value={url}
                />
                <img src={url} alt="" className="imgUrl_hotel" />
              </div>
            ))}
          </section>
          <section>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Featured</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={featured ? featured : dataValue.featured}
                  label="Featured"
                  onChange={(e) => {
                    setFeatured(e.target.value);
                  }}
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
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
          Update!
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
