'use strict'

// Imports and definitions
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { loadEnvFile } = require('node:process');

let { persons } = require("./data.js");

const app = express();
const PORT = 3001;
loadEnvFile();

// Middlewares
app.use(express.static('frontend/dist'));
app.use(cors({
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200
}));
app.use(express.json());

morgan.token('req-body', (req) => { 
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        return JSON.stringify(req.body);
    }
    return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

// Endpoints
app.get("/api", (req, res) => {
    res.send("This is phonebook API!");
});

app.get("/api/persons", (req, res) => {
    return res.status(200).json({
        persons
    });
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: "id sent is invalid" });

    const matchedPerson = persons.find((person) => person.id == id);
    if (!matchedPerson)
        res.status(404);
    else
        res.status(200);

    return res.json(matchedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: "id sent is invalid" });

    const deletedPersons = persons.filter((p) => p.id != id);
    if (deletedPersons.length == persons.length)
        return res.status(400).json({ error: "id not existed" });
    persons = deletedPersons;
    return res.status(200).json({ error: "none" });
});

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = req.body;

    if (!id)
        return res.status(400).json({ error: "id sent is invalid" });
    if (!person)
        return res.status(400).json({ error: "body sent is invalid" });
    // Check id exist?

    const matchedPerson = persons.find((person) => person.id == id);
    if (!matchedPerson)
        return res.status(404).json({error: "this user may be deleted"});

    const updatedPersons = persons.map(p => 
        p.id === id ? person : p
    );
    persons = updatedPersons;
    return res.status(200).json({ error: "none" });
})

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    if (!req.body)
        return res.status(400).json({ error: "missing body" });

    const matchedPersonByName = persons.find((person) => person.name == name);
    if (matchedPersonByName)
        return res.status(400).json({ error: "existed" });

    const newPerson = {
        name,
        number,
        id: String(Math.floor(Math.random() * 10e12))
    };

    persons.push(newPerson);
    return res.status(201).json({ error: "none", id: newPerson.id });
});

app.get("/info", (req, res) => {
    const personsNumber = persons.length;
    const currentDate = (new Date()).toUTCString();

    console.info(`/info: number of persons available ${personsNumber}`);

    res.send(`<p>Phonebook has info for ${personsNumber} people</p>\n<p>${currentDate}</p>`);
});

// Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});