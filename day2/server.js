const express = require('express');
const app = express(); // server instance create karna

app.listen(3000); // server ko port 3000 par start karna

app.get('/', (req, res) => {
    res.send('Hello World!1 hellow orld 2'); // root route par response bhejna
}); //user agar slash par reqyset bheje to ye function chalega and response hellow world dega


app.get('/about', (req, res) => {
    res.send('About Us Page'); // about route par response bhejna
}); //user agar about par request bheje to ye function chalega and response about us page dega

