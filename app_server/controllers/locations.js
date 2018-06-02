var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var _formatDistance = function (distance) {
  var numDistance, unit;
  if (distance && _isNumeric(distance)) {
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'km';
    } else {
      numDistance = parseInt(distance * 1000,10);
      unit = 'm';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message: message
  });
};
/* GET 'home' page */
module.exports.homelist = function(req, res) {
    res.render('locations-list', {
        title: 'Foodie - get homemade foods',
        pageHeader: {
            title: 'Foodie',
            strapline: 'Get homemade foods from real life moms'
        },
        sidebar: "Missing homemade foods but too busy to cook? Foodie helps you get foods from real life mom. Perhaps homemade spaghetti? Let Foodie help you find the homemade foods you're looking for.",
        locations: [{
            name: 'Yen Vuong',
            address: '125 Beacon Ave S, Seattle, WA',
            rating: 3,
            facilities: ['Hot drinks', 'Spaghetti', 'Fried Rice'],
            distance: '100m'
        }, {
            name: 'Yuki Ayame',
            address: '125 Beacon Ave S, Seattle, WA',
            rating: 4,
            facilities: ['Spring rolls', 'Pad Thai', 'Japanese omelet'],
            distance: '200m'
        }, {
            name: 'Ritika Jesa',
            address: '125 Beacon Ave S, Seattle, WA',
            rating: 2,
            facilities: ['Fried noodle with eggs', 'Chicken Tikka Masala'],
            distance: '250m'
        }]
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Foodie',
        pageHeader: {
            title: 'Yen Vuong'
        },
        sidebar: {
            context: 'is on Foodie because her Vietnamese foods are simply amazing',
            callToAction: 'If you\'ve been wanting to eat Pho but could not find any good restaurant, Yen is for you'
        },
        location: {
            name: 'Yen Vuong',
            address: '125 Beacon Ave S, Seattle, WA',
            rating: 3,
            facilities: ['Hot drinks', 'Spaghetti', 'Fried Rice'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '6:00pm',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '5:00pm',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Max Tran',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'Her foods are simply amazing especially Pho'
            }, {
                author: 'Jinz Nguyen',
                rating: 5,
                timestamp: '16 June 2013',
                reviewText: 'I love Vietnamese food. Her homemade food is reminiscent of my mother\'s food'
            }]
        }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Yen Vuong on Loc8r',
        pageHeader: {
            title: 'Review Yen Vuong'
        }
    });
};