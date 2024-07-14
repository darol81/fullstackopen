require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
/* Middlewares */
app.use(cors())
app.use(express.json());

/*const requestLogger = (request, response, next) => 
{
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
}
*/
//app.use(requestLogger);

const Note = require("./models/note");


/* ROUTES, main */

app.get("/", (request, response) => 
{
    response.send("<h1>Hello World!</h1>");
});

/* POST routes */
app.post("/api/notes", (request, response) => 
{  
    const body = request.body;

    if (!body.content) 
    {
        return response.status(400).json({ error: "content missing" });
    }
  
    const note = 
    {
        content: body.content,
        important: body.important || false,
    };
  
    notes = notes.concat(note);
    response.json(note);
});

/* GET routes */

app.get("/api/notes", (request, response) => 
{
    Note.find({}).then(notes => 
    {
        response.json(notes)
    });
});

app.get("/api/notes/:id", (request, response) => 
{
    const id = request.params.id;
    const note = notes.find(note => note.id === id);

    if(note) 
    {    
        response.json(note);
    } 
    else 
    {    
        response.status(404).end();
    }
});

/* ROUTES, delete */
app.delete("/api/notes/:id", (request, response) => 
{
    const id = request.params.id;
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

const unknownEndpoint = (request, response) => 
{
    response.status(404).send({ error: "unknown endpoint" });
}
 
app.use(unknownEndpoint);

/* Pääohjelma */
const PORT = process.env.PORT;

app.listen(PORT, () => 
{
    console.log(`Server running on port ${PORT}`);
});