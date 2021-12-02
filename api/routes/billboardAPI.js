// for web-scraping
var request = require("request")
var cheerio = require("cheerio")

// for API construction
var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next){
    request('https://www.billboard.com/charts/hot-100', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const listItems = $(".chart-element__information");
            const songs = [];
            listItems.each((idx, el) => {
                const title = $(el).children(".chart-element__information__song").text();
                const artist = $(el).children(".chart-element__information__artist").text();
                const titleAndArtist = "\"" + title + "\"" + " by " + artist;
                songs.push(titleAndArtist);
            });
            res.send(songs);
        }
    });
});

module.exports=router;
