const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'studets',
  password: 'ambria26',
  port: 5432,
})

const getStudents = (request, response) => {
    pool.query('SELECT * FROM students ORDER BY studentID ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const getStudentById = (request, response) => {
    const id = parseInt(request.params.studentID)
  
    pool.query('SELECT * FROM students WHERE studentID = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createStudent = (request, response) => {
    const { name } = request.body
  
    pool.query('INSERT INTO students (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.studentID}`)
    })
  }

  const updateStudentGrade = (request, response) => {
    const id = parseInt(request.params.studentID)
    const {history, math, science} = request.body
  
    pool.query(
      'UPDATE students SET history = $1, math = $2, science = $3 WHERE studentID = $4',
      [history, math, science, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }


  module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudentGrade

}
