/*
    - server ko start karna 
    - database se connect karna

*/

const app = require("./src/app")
const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect("mongodb+srv://anshtaank24_db_user:IkQwd0ZfPWL9AQqc@cluster0.1w6xn3a.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to database");
    })
}
  
connectToDB();

app.listen(3000,()=>{ 
    console.log("server is running at port 3000");
})  