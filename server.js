const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB)
    .then(() => console.log('Connection Successful'))
    .catch((err) => console.log('Failed connection', err))


const port = process.env.PORT;

app.listen(port, () => { 
    console.log('Server is listening to port', port);
    
})
