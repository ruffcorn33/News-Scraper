// const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models/index.js");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = function(app) {

  // GET to load all unsaved postings
  app.get("/", function (req, res) {
    db.Posting.find({
      saved: false
    })
    .then(function (dbPosting) {
      let hbsObject = {
        postings: dbPosting
      };
      res.render("home", hbsObject);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  // A GET route for scraping the Hacker News website
  app.get("/scrape", function(req, res) {

      axios.get('https://news.ycombinator.com/jobs').then(function (response) {
       
        let $ = cheerio.load(response.data);
        let x = 0;
        
        $('span.comhead').each(function(i, element){

          // get elements from the Hacker News Jobs page
          let anchor = $(this).prev();
          let title = anchor.text();
          let url = anchor.attr('href');
          let subtext = anchor.parent().parent().next().children('.subtext').children();
          let age = $(subtext).eq(0).text();
                    
          //build a result object
          var result = {
            title: jobtitle,
            url: url,
            age: age
          };
  
          // Create a new posting using the `result` object built from scraping
          db.Posting.create(result)
          .then(function(dbPosting) {
            // View the added result in the console
            console.log(dbPosting);
            x++;
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
        });
        res.json({
          count: x
        });
      });
  });


  // GET to load all saved jobs
  // app.get("/saved", function (req, res) {
  //   db.Posting.find({
  //     saved: true
  //   })
  //   .then(function (dbPosting) {
  //     let hbsObject = {
  //       postings: dbPosting
  //     };
  //     res.render("saved", hbsObject);
  //   })
  //   .catch(function (err) {
  //     res.json(err);
  //   });
  // });


  // GET to load a specific posting and its notes
  app.get("/postings/:id", function (req, res) {
  db.Posting.findOne({
      _id: req.params.id
    })
    .populate("notes")
    .then(function (dbPosting) {
      res.json(dbPosting);
    })
    .catch(function (err) {
      res.json(err);
    });
  });


  // POST to create a posting's note
  app.post("/postings/:id", function (req, res) {
    db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Posting.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          notes: dbNote._id
        }
      }, {
        new: true
      });
    })
    .then(function (dbPosting) {
      res.json(dbPosting);
    })
    .catch(function (err) {
      res.json(err);
    });
  });


  // POST to save a posting
  app.post("/saveposting/:id", function (req, res) {
    db.Posting.findByIdAndUpdate({
      _id: req.params.id
    }, {
      saved: true
    })
    .then(function (dbPosting) {
      res.json(dbPosting);
    })
    .catch(function (err) {
      res.json(err);
    });
  });


  // POST to delete a saved posting
  app.post("/deleteposting/:id", function (req, res) {
    db.Posting.findByIdAndUpdate({
      _id: req.params.id
    }, {
      saved: false
    })
    .then(function (dbPosting) {
      res.json(dbPosting);
    })
    .catch(function (err) {
      res.json(err);
    });
  });


  // POST to delete a note
  app.post("/deletenote/:id", function (req, res) {
    db.Note.remove({
      _id: req.params.id
    })
    .then(function (dbNote) {
      res.json(dbNote);
    })
    .catch(function (err) {
      res.json(err);
    });
  });
}
