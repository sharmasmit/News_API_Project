import express from "express";

import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const cityName = req.query.city;
  const apiKey = "d36416902d21ce68786a4cc7c8d10284";

  if (!cityName) {
    res.render("index.ejs", {
      cityName: "",
      weatherDescription: "",
      temperature: "",
      humidity: ""
    });
    return;
  }

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    res.render("index.ejs", {
      cityName: result.data.name,
      weatherDescription: result.data.weather[0].description,
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
// app.get("/", async (req, res) => {
//   try {
//     const result = await axios.get(
//       "https://projs.ifdemo.com/p15/jumbo/wp-json/wp/v2/pages/105?_fields[]=meta_box"
//     );
//     res.render("index.ejs", {
//       loginImg: result.data.meta_box.login_sigup_image.sizes.thumbnail.url,
//       imgWidth: result.data.meta_box.login_sigup_image.width,
//       imgHeight: result.data.meta_box.login_sigup_image.height,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     res.status(500);
//   }
// });

// app.get("/", async (req, res) => {
//   try {
//     const result = await axios.get("https://dog.ceo/api/breeds/image/random");
//     res.render("index.ejs", {
//       dogImg: result.data.message,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     res.status(500);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
