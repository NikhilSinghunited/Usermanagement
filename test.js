const axios = require('axios');

// Replace with your YouTube API key
const apiKey = 'AIzaSyAbzTgr9DSO2bQ2c0QJSUkQB1rGS9Eli4Y';
const express=require("express");
const app=express();
// Function to fetch video data
async function fetchVideoData() {
    try {
        const videoId = 'F8FcWV56sp4'; // Replace with the desired video ID
        const part = 'snippet,statistics'; // Specify the parts of the video resource to include
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=${part}`;

        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(data);

        // Display video data
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching video data:', error);
    }
}

// Call the function to fetch video data
fetchVideoData();
