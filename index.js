import express from 'express';
import contactRoutes from './src/routes/crmRoutes';
import userRoutes from './src/routes/userRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwentoken from 'jsonwebtoken';
const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

// bodyparser setup
app.use(bodyParser.json());

// JWT setup
app.use((req,res,next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwentoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if(err) {
                req.user = undefined;
            }
            else{
                req.user = decode;
                next();
            }
        })
    }
    else{
        req.user = undefined;
        next();
    }
})

//routes setup
app.use('/contact', contactRoutes);
app.use('/auth', userRoutes);

app.get('/', (req,res) => {
    res.send(`node and express server running on port ${PORT}`);
})

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
})