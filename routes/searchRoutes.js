const express = require('express')
const router = express.Router()

var Flickr = require('flickr-sdk');
var flickr = new Flickr('98a4ffdf81712c5a42abd91a14fc1405','016aa94990d42455')

router.post('/api/search', (req,res) => {
    flickr.photos.search({
        text : req.body.text
    },
    ).then(result => {
        var allPhotos = result.body.photos.photo.map(photo => ({
            photoStaticURL: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg',
            PhotoFlickrURL: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id,
            photoOwnerURL: 'https://www.flickr.com/photos/' + photo.owner,
            photoTitle: photo.title,
            photoOwner: photo.owner,
        }))
        res.send(allPhotos)
    })
})

module.exports = router