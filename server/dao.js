var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluserr",
  password: "suserpwS1!",
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS memes (id INT, url varchar(2560), categoryid INT);";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

function resultRowToHtml(id, url, categoryId, spanId){
  return "<span id=\"span-" + spanId + "\">id: " + id + "<br>Url: " + url + "<br>categoryid: " + categoryid + "</span>";
}

async function getRatingsAsHtml(){
  return new Promise(resolve => {
    con.query("SELECT id, url, categoryId FROM memes;",
    function (err, result, fields){
      if (err) return PromiseRejectionEvent(err);

      var html = "";

      for(var n=0; n < result.length; n++) {
        html += resultRowToHtml(result[n].id, result[n].url, result[n].categoryId, n);
     }

      console.log("Result inside DAO: " + html);
      resolve(html)
  })
  });
};




module.exports = {
  getRatingsAsHtml: getRatingsAsHtml,

  deleteRating: function (id, url, categoryId) {
 //   con.query("DELETE FROM rating WHERRE ratee=" + con.escape(ratee) + " AND stars=")
    con.query("DROP TABLE memes;");
  },
  
 // getAllRatings: function() {
   // con.query("SELECT id, url, categoryId FROM memes;",
  //  function (err, result, fields){
  //    if (err) throw err;

    //  var html = "";

   //   for(var n=0; n < result.length; n++) {
     //   console.log(result[n]);    
        
     // }
     // return html;
    //}//);
  //},
  
  getAllRatings: function() {
    return new Promise( resolve => {
    con.query("SELECT ratee, stars, comment FROM rating;",
    function (err, result, fields) {
    if (err) throw err;
     
    //return the star value:
    resolve(result[0].stars)
    })
    });
    },

  insertRating: function (id, url, categoryId) {
    return new Promise( resolve => {
    con.query("INSERT INTO memes VALUES ( ? )", [[id, url, categoryId]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted\n\n\nHi");


    });    
  }
);}

//  deleteRating: function (ratee, stars, comment) {
//    con.query("DELETE FROM rating WHERE ratee=" con.escape(ratee) +  " AND stars=" + con.escape(stars) + "AND comment=" + con.escape(comment) + ";",
//    function (err, result) {
   //     if (err) throw err;
  //      console.log("1 record deleted");
   // });    
  }

