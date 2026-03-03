require('dotenv').config();//jab tak tum ye line nhi likhe tab tak tum env file a koi bhi variable pure server me kahi bhi nhi use kar sathe har jagha undefined aaega

const app = require('./src/app');
const connectToDb = require('./src/config/database');

connectToDb();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});