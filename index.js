const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

app.use(bodyParser.json());

//llenar contexto
// app.use((req, res, next) => {
//     req.user = {
//         name: 'Joaquin'
//     };

//     next();
// });

// app.use((req, res, next) => {
//     console.log(req.user);
// });

app.use('/api', routes());

mongoose.connect('mongodb://localhost:27017/restful', (err) => {
    console.log(err);
    app.listen(3000, () => {
        console.log('Server running');
    });
});
