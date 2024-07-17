require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

/* Middlewares */
app.use(cors())
app.use(express.json())

/* Morgan middleware */
morgan.token('body', request => JSON.stringify(request.body))
const tiny_format = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(tiny_format))

/* Models */
const Note = require('./models/note')

/* ROUTES, main */

app.get('/', (request, response) =>
{
  response.send('<h1>Hello World!</h1>')
})

/* POST routes */
app.post('/api/notes', (request, response, next) =>
{
  const body = request.body

  if (!body.content)
  {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote =>
  {
    response.json(savedNote)
  }).catch(error => next(error))
})

/* PUT routes */
app.put('/api/notes/:id', (request, response, next) =>
{
  const body = request.body

  const note = {
    content: body.content,
    important: body.important || false
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' }).then(updatedNote =>
  {
    response.json(updatedNote)
  }).catch(error => next(error))
})

/* GET routes */
app.get('/api/notes', (request, response) =>
{
  Note.find({}).then(notes =>
  {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) =>
{
  Note.findById(request.params.id).then(note =>
  {
    if(note)
    {
      response.json(note)
    }
    else
    {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

/* DELETE routes */
app.delete('/api/notes/:id', (request, response, next) =>
{
  Note.findByIdAndDelete(request.params.id).then(() =>
  {
    response.status(204).end()
  }).catch(error => next(error))
})

/* Unknown endpoint */
const unknownEndpoint = (request, response) =>
{
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/* Error handling */
const errorHandler = (error, request, response, next) =>
{
  console.error(error.message)

  if(error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

/* Pääohjelma */
const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
{
  console.log(`Server running on port ${PORT}`)
})
