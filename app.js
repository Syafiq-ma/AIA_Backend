const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 5000);

var request = require("request")
const moment = require('moment')

app.get('/api/data', (req,res) => {
    request({
        url:'https://api.flickr.com/services/feeds/photos_public.gne?format=json',
        json: true
    }, function(error, response, body){
        var mySubString = body.substring(
            body.indexOf("[") - 1,
            body.lastIndexOf("]") + 1
        )
        var data = JSON.parse(mySubString)
        allPhotos = data.map(photo => ({

            photoStaticURL: photo.media.m.toString().replace("\\", ""),
            PhotoFlickrURL: photo.link.toString().replace("\\", ""),
            photoOwnerURL: 'https://www.flickr.com/photos/' + photo.author_id,
            photoTitle: photo.title,
            photoPublushed: moment(photo.published).format('MM MMMM YYYY'),
            photoOwner: photo.author.substring(
                photo.author.indexOf("\"") + 1,
                photo.author.lastIndexOf("\"") - 1
            ),
            photoTags: photo.tags
        }))
        res.send(allPhotos) 
    })
})