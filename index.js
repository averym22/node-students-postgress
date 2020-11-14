const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3020

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/students', db.getStudents);

app.get('/students/:studentID', db.getStudentById)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.post('/register', db.createStudent);

app.post('/grade/:studentID', db.updateStudentGrade)

