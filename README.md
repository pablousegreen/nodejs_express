# nodejs_express
Basic node js express elasticsearch 
Download elasticsearch
cd Downloads
cd elasticsearch-7.3.2
cd bin
./elasticsearch
http://localhost:9200/


Download Kibana
cd Downloads
cd cd kibana-7.3.2-darwin-x86_64
cd bin
./kibana
http://localhost:5601


localhost:3000/api/workouts
{
    "message": "GET workout call succeded",
    "workout": [
        {
            "id": 1,
            "type": "Weights",
            "duration": 45,
            "date": "10/07/19"
        },
        {
            "id": 2,
            "type": "Run",
            "duration": 30,
            "date": "10/07/19"
        }
    ]
}

localhost:3000/api/workouts/5
{
    "message": "GET workout call for id 5 succeded",
    "workout": {
        "id": 5,
        "type": "Mex Open 5",
        "duration": 3,
         "comment": "firt comment to app",
        "date": "18/09/19"
    }
}

//POST
localhost:3000/api/workout
{
	"id": 5,
	"type": "Mex Open 5",
	"duration": 3,
	 "comment": "firt comment to app",
	"date": "18/09/19"
}


https://www.youtube.com/watch?v=RUw1WUsRuH8

