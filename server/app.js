const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./dao.js');
const { getAllRatings } = require('./dao.js');
const { response } = require('express');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/whichIsBetter', (request, response)  => {
    //flip a coin, if heads return Marvel, if tails return  DC

    var result = "Marvel";

    var rand = Math.random();
    if(rand < .5) {
        result = "DC";
    }

    response.status(200).send( result )
    });

app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})


app.get('/crewOrImp', async (request, response)  => {
    var rand = Math.random();
    if(rand < .5) {
        var imgTag = "<img width = '750px' height = '500px' style='display:block; margin-left: auto; margin-right: auto;' src ='https://static0.srcdn.com/wordpress/wp-content/uploads/2020/10/Among-Us-Imposter-1.jpg' alt ='impasta' ><h3 style='color:pink;'>Imposter</h3>";
    }
    else{
        var imgTag = "<img width = '750px' height = '500px' style='display:block; margin-left: auto; margin-right: auto;' src ='https://staticg.sportskeeda.com/editor/2020/12/42873-16071144340129-800.jpg' alt ='Nope'><h3 style='color:lightblue;'>Crewmate</h3>";
    }
    response.status(200).send(imgTag);

})

app.get('/insertMeme', async (request, response)  => {
    
    var rand = Math.random();
    if(rand < .5) {
        var imgTag = "<img width = '750px' height = '500px' style='display:block; margin-left: auto; margin-right: auto;' src ='https://static0.srcdn.com/wordpress/wp-content/uploads/2020/10/Among-Us-Imposter-1.jpg' alt ='impasta' ><h3 style='color:pink;'>Imposter</h3>";
    }
    else{
        var imgTag = "<img width = '750px' height = '500px' style='display:block; margin-left: auto; margin-right: auto;' src ='https://staticg.sportskeeda.com/editor/2020/12/42873-16071144340129-800.jpg' alt ='Nope'><h3 style='color:lightblue;'>Crewmate</h3>";
    }
    response.status(200).send(imgTag);


    var id = request.query.id;
    var url = request.query.url;
    var categoryId = 1;
   // var categoryId = request.query.categoryId;
    
    dao.insertRating(id, url, categoryId);

    response.status(200).send( {});

 
 
 
 
 
    // dao.insertMeme(request.query.filepath);

  //  response.status(200).send( {});
    
});


app.get('/getRatings', async (request, response)  => {
    var ratingsHtml = await dao.getRatingsAsHtml();
    console.log('grabbig it now, cheif')
    //TODO: connect to the database, select all ratings, and return them in an HTML table or similar
   // dao.getAllRatings();
  //  console.log("HTML Response: " + ratingsHtml);

    response.status(200).send( ratingsHtml );
})

app.get('/getTopMeme', async (request, response)  => {
    var ratingsHtml = await dao.getTopMeme();
    console.log('grabbig it now, cheif')
    //TODO: connect to the database, select all ratings, and return them in an HTML table or similar
   // dao.getAllRatings();
  //  console.log("HTML Response: " + ratingsHtml);

    response.status(200).send( ratingsHtml );
})

//app.get('/getMeme', async (request, response) = > )
//Todo: add deleteRating() route
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});