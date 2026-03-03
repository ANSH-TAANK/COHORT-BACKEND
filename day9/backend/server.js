/**
 * server ko start karne wala file
 * database connection bhi yaha se hoga
 */
require('dotenv').config();
const app = require('./src/app');
const connectToDb = require('./src/config/database');

// Connect to the database
connectToDb();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});