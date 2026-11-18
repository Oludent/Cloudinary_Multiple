require('dotenv').config()

const express = require('express');
const PORT = process.env.PORT

const sequelize = require('./database/database')
const documentRouter = require('./routers/documentRouter')

const app = express();

app.use(express.json());
app.use(documentRouter)



const dbConnect = async()=>{
    try {
        await sequelize.authenticate();
        console.log(`Database connection establised successfully`)
    } catch (error) {
        console.log(`Database failed to connect`, error.mesaage)
    }
}
dbConnect();

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})