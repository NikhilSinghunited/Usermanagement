const { YoutubeDataAPI } = require("youtube-v3-api");
const express = require("express");
const app = express();
const port = 3000;
const API_KEY = 'AIzaSyAbzTgr9DSO2bQ2c0QJSUkQB1rGS9Eli4Y'; // Replace 'YOUR_API_KEY' with your actual API key
const api = new YoutubeDataAPI(API_KEY);

const videoId = 'cCjibyE3oSo'; // Replace with the video ID you want to fetch

api.searchVideo({ id: videoId }).then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
