const express = require('express');
const app = express();
app.use(express.json()) //agar tum req.body ka data padhna chahte ho to ye line likhni padegi kyuki by default express req.body ko nahi padh pata its not that capable

const notes =[]

app.post("/notes",(req,res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("note created")
}) //frontend se koi data aaega aur usse resourse create karenge backend me

app.get("/notes",(req,res) => {
    res.send(notes)
})//server side me kuch data hai aur vo data ham front end par mangva rahe hai to uske liya get request bhejni padegi

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); //server start karne ke liye ye line likhni padegi