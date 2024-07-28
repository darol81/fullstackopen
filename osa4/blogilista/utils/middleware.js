const jwt = require('jsonwebtoken')

/* Unknown endpoint */
const unknownEndpoint = (request, response) =>
{
  response.status(404).send({ error: 'unknown endpoint' })
}


/* Error handling */
const errorHandler = (error, request, response, next) =>
{
  //logger.error(error.message)

  if(error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'))
  {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name ===  'JsonWebTokenError')
  {
    return response.status(400).json({ error: 'token missing or invalid' })
  }
  else if (error.name === 'TokenExpiredError')
  {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

const getTokenFrom = request =>
{
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer '))
  {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (request, response, next) =>
{
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = (request, response, next) =>
{
  const token = request.token
  if(!token)
  {
    request.user = null
    return next()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = decodedToken.id
  next()
}

module.exports =
{
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
