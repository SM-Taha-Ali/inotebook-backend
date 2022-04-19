// Import express and connection arrow function
const connection = require('./db_connect');
const express = require('express')
var cors = require('cors')


// Connection to MongoDB
connection();


const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})