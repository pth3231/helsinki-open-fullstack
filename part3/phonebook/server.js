'use strict'

// Imports and definitions
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { loadEnvFile } = require('node:process')
loadEnvFile()

const app = express()
const PORT = process.env.PORT

// Middlewares
app.use(express.static('frontend/dist'))
app.use(cors({
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200
}))
app.use(express.json())

morgan.token('req-body', (req) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

const PersonService = require('./services/persons.service')

// Endpoints
app.get('/api', (req, res) => {
    res.send('This is phonebook API!')
})

app.get('/api/persons', async (req, res) => {
    try {
        const persons = await PersonService.findAll()
        console.log(persons)
        return res.json({ persons })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
})

app.get('/api/persons/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!id)
            return res.status(400).json({ error: 'id sent is invalid' })
        const matchedPerson = await PersonService.findById(id)
        if (!matchedPerson)
            throw Error('User not exist')
        return res.json(matchedPerson)
    } catch (err) {
        console.error(err)
        return res.status(404).json({})
    }
})

app.delete('/api/persons/:id', async (req, res) => {
    const id = req.params.id
    if (!id)
        return res.status(400).json({ error: 'id sent is invalid' })
    try {
        const result = await PersonService.delete(id)
        if (!result)
            throw Error('User may not exist')
        return res.json({ error: 'none' })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'id not existed' })
    }
})

app.put('/api/persons/:id', async (req, res) => {
    const id = req.params.id
    const person = req.body

    if (!id)
        return res.status(400).json({ error: 'id sent is invalid' })
    if (!person)
        return res.status(400).json({ error: 'body sent is invalid' })

    try {
        const updatePersonResult = await PersonService.updatePerson(id, person.number)
        if (!updatePersonResult)
            throw Error('Error occurred during updating')
        return res.json(updatePersonResult)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Cannot update' })
    }
})

app.post('/api/persons', async (req, res) => {
    const { name, number } = req.body
    if (!req.body)
        return res.status(400).json({ error: 'missing body' })
    try {
        const createdPerson = await PersonService.create(name, number)
        res.status(201).json({
            error: null,
            createdPerson
        })
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ error: 'User existed' })
        res.status(400).json({ error: 'Unknown error' })
    }
})

app.get('/info', async (req, res) => {
    try {
        const personsNumber = await PersonService.countAllPersons()
        const currentDate = (new Date()).toUTCString()

        console.info(`/info: number of persons available ${personsNumber}`)

        res.send(`<p>Phonebook has info for ${personsNumber} people</p>\n<p>${currentDate}</p>`)
    } catch (err) {
        console.log(err)
    }
})

// Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})