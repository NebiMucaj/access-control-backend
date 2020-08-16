const express = require('express');
const app= express();
const bodyparser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
require('dotenv/config')
const member=require('./routes/member')

const swaggerOptions={
swaggerDefinition:{
   info:{ title:'Access controll API',
    description:'',
    contact:{
    name:'Nebi Mucaj '

    },
    servers:['http://localhost:5000'],
   }
},
apis:['./routes/*.js']

}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var cors = require('cors')
app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyparser.json())
app.use('/member',member)
app.listen(5000);
console.log('server is listining on port 5000')


module.exports = app