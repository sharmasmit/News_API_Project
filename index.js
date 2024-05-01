import express from "express";

import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_432365836b257d392a9f42b559e419ad5da5d&country=in&language=en&category=crime,education,politics,sports,technology "
    );
    res.render("index.ejs", {
      newsData: result.data, // Pass the entire data object
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
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
})