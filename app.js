const express = require("express");
const app = express();

const port = 5000;
var threshold = 11;
var drivers = [
    {
    name: "DL",
    x:2,
    y:3,
    avalability: true
    },
    {
    name: "PK",
    x:2,
    y:5,
    avalability: false
    },
    {
    name: "MK",
    x:4,
    y:3,
    avalability: true
    },
  ]
   
  var user = {
    x:10,
    y:9
  }
  
app.get("/", (req, res) =>  {
    let distance = 0;
    let temp =threshold;
    let result = null;
    for (var i = 0; i < drivers.length; i++) {
      if(drivers[i].avalability){
        distance = Math.sqrt((drivers[i].x-user.x)*(drivers[i].x-user.x)+(drivers[i].y-user.y)*(drivers[i].y-user.y));
        if(threshold>=distance){
          if (temp>distance) {
            temp=distance;
            result = drivers[i]
          }
        }
      }
    }
    // return result;
    if (!result) {
        res.status(404).json({
            success: true, 
            message: "Cab not found at your location"
        })
    }
    res.status(200).json({
        success: true, 
        dirver: result
    })
});

app.listen(port, () =>
  console.log(`app listening on port!` + port)
);