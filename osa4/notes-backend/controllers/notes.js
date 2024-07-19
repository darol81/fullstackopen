const notesRouter = require('express').Router()

/* Models */
const Note = require('../models/note')

/* POST routes */
notesRouter.post('/', (request, response, next) =>
{
  const body = request.body

  if (!body.content)
  {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note
  ({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote =>
  {
    response.json(savedNote)
  }).catch(error => next(error))
})

/* PUT routes */
notesRouter.put('/:id', (request, response, next) =>
{
  const body = request.body

  const note =
    {
    	content: body.content,
    	important: body.important || false
    }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' }).then(updatedNote =>
  {
    response.json(updatedNote)
  }).catch(error => next(error))
})

/* GET routes */
notesRouter.get('/', (request, response) =>
{
  Note.find({}).then(notes =>
  {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) =>
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
notesRouter.delete('/:id', (request, response, next) =>
{
  Note.findByIdAndDelete(request.params.id).then(() =>
  {
    response.status(204).end()
  }).catch(error => next(error))
})

module.exports = notesRouter