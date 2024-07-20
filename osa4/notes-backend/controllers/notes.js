const notesRouter = require('express').Router()
const Note = require('../models/note')

/* POST routes */
notesRouter.post('/', async (request, response) =>
{
  const body = request.body

  const note = new Note
  ({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

/* PUT routes */
notesRouter.put('/:id', async (request, response) =>
{
  const body = request.body

  const note =
    {
    	content: body.content,
    	important: body.important || false
    }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note,
    {
      new: true,
      runValidators: true,
      context: 'query'
    })

  response.json(updatedNote)
})

/* GET routes */
notesRouter.get('/', async (request, response) =>
{
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) =>
{
  const note = await Note.findById(request.params.id)
  if (note)
  {
    response.json(note)
  }
  else
  {
    response.status(404).end()
  }
})

/* DELETE routes */
notesRouter.delete('/:id', async (request, response) =>
{
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
