var express = require("express");
var router = express.Router();
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

var workouts = [
  {
    id: 1,
    type: "Weights",
    duration: 45,
    comment: "firt comment to app",
    date: "10/07/19"
  },
  {
    id: 2,
    type: "Run",
    duration: 30,
    comment: "firt comment to app",
    date: "10/07/19"
  }
];

router.use((req, res, next) => {
  console.log(req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4201");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  next();
});

//GET ALL
router.get("/workouts", async (req, res) => {
  let workout = [];

  const response = await client.search({
    index: "workout",
    // keep the search results "scrollable" for 30 seconds
    scroll: "30s",
    // for the sake of this example, we will get only one result per search
    size: 1000,
    body: {
      query: {
        match_all: {}
      }
    }
  });

  if (response === null || response === undefined) {
    return res.status(400).send({
      message: `workout is not found for all`
    });
  }

  response.hits.hits.map(e => {
    workout.push(e);
  });

  return res.status(200).send({
    message: "GET workout call succeded",
    workout: workout
  });
});

//GET ONE BY ID
router.get("/workouts/:id", (req, res) => {
  // let workout = workouts.find(workout => workout.id == req.params.id)
  let workout;

  client.get(
    {
      index: "workout",
      type: "mytype",
      id: req.params.id
    },
    (err, resp, status) => {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        workout = resp._source;
        console.log(`I found the requested document ${resp}`);
      }
      if (!workout) {
        return res.status(400).send({
          message: `workout is not found for id ${req.param.id}`
        });
      }
      return res.status(200).send({
        message: `GET workout call for id ${req.params.id} succeded`,
        workout: workout
      });
    }
  );
});

//GET ALL
router.get("/workouts/get/:comment", async (req, res) => {
  let workout = [];
  let commentParam = req.params.comment;
  console.log("commentParam: ", commentParam);
  const response = await client.search({
    index: "workout",
    type: "mytype",
    // keep the search results "scrollable" for 30 seconds
    scroll: "30s",
    // for the sake of this example, we will get only one result per search
    size: 1000,
    // filter the source to only include the quote field
    //_source: ["comment"],
    body: {
      query: {
        bool: {
          must: {
            match: {
              comment: commentParam
            }
          }
        }
      }
    }
  });

  if (response === null || response === undefined) {
    return res.status(400).send({
      message: `workout is not found for all`
    });
  }

  response.hits.hits.map(e => {
    workout.push(e);
  });

  return res.status(200).send({
    message: "GET workout call succeded",
    workout: workout
  });
});

//POST workout
router.post("/workout", (req, res) => {
  console.log(`Bodi id: ${req.body.id}`);
  if (!req.body.id) {
    return res.status(400).send({
      message: `Id is required`
    });
  }
  //
  // workouts.push(req.body);
  client.index(
    {
      index: "workout",
      type: "mytype",
      id: req.body.id,
      body: req.body
    },
    (err, resp, status) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        return res.status(200).send({
          message: `POST workout call succeded`
        });
      }
    }
  );
});

//UPDATE WORKOUT

router.put("/workout", (req, res) => {
  console.log(`Bodi id: ${req.body.id}`);
  if (!req.body.id) {
    return res.status(400).send({
      message: `Id is required`
    });
  }

  client.index(
    {
      index: "workout",
      type: "mytype",
      id: req.body.id,
      body: req.body
    },
    (err, resp, status) => {
      if (err) {
        console.log(`Error ${err}`);
      } else {
        return res.status(200).send({
          message: "PUT workout call suecceded"
        });
      }
    }
  );
});

router.delete("/workout/:id", (req, res) => {
  var foundIndex = workouts.findIndex(w => w.id == req.params.id);
  workouts.splice(foundIndex, 1);
  return res.status(200).send({
    message: `DELETE workout call for id ${req.params.id} succeded`
  });
});
module.exports = router;
