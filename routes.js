var express = require('express');


var router = express.Router();
var workouts = [
    {
        id:1,
        type: 'Weights',
        duration: 45,
        date: "10/07/19"
    },
    {
        id:2,
        type: 'Run',
        duration: 30,
        date: "10/07/19"
    }
]

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

//GET ALL
router.get('/workouts', (req, res)=>{
    return res.status(200).send({
        message: 'GET workout call succeded',
        workout: workouts
    });
});

//GET ONE BY ID
router.get('/workouts/:id', (req, res) =>{
    let workout = workouts.find(workout => workout.id == req.params.id)

    if(!workout){
        return res.status(400).send({
            message: `Workout is not found for id ${req.params.id}` 
        });
    }

    return res.status(200).send({
        message: `GET workout call for id ${req.params.id} succeded`,
        workout: workout
    });
})

//POST workout
router.post('/workout', (req, res) => {
    console.log(`Bodi id: ${req.body.id}`);
    if(!req.body.id ){
        return res.status(400).send({
            message : `Id is required`
        });
    }
    workouts.push(req.body);
    return res.status(200).send({
        message: `POST workout call succeded`
    });
})

//UPDATE WORKOUT

router.put('/workout' , (req, res) =>{
    console.log(`Bodi id: ${req.body.id}`);
    if(!req.body.id ){
        return res.status(400).send({
            message : `Id is required`
        });
    }

    var foundIndex = workouts.findIndex(w => w.id == req.body.id);
    workouts[foundIndex] = req.body;
    return res.status(200).send({
        message: `PUT workout call for id ${req.body.id} succeded`
    })
})

router.delete('/workout/:id', (req, res) =>{
    var foundIndex = workouts.findIndex(w => w.id == req.params.id);
    workouts.splice(foundIndex, 1);
    return res.status(200).send({
        message: `DELETE workout call for id ${req.params.id} succeded`
    });

})
module.exports= router;