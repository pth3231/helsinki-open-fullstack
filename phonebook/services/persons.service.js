const Person = require('../models/persons.model')

const PersonService = {
    async findAll() {
        return await Person.find({})
    },

    async findById(id) {
        return await Person.findById(id)
    },

    async create(name, number) {
        const person = new Person({
            name,
            number
        })
        return await person.save()
    },

    async delete(id) {
        return await Person.findByIdAndDelete(id)
    },

    async updatePerson(id, newNumber) {
        const filter = { _id: id }
        const update = { number: newNumber }
        return await Person.findOneAndUpdate(filter, update, {
            returnDocument: 'after',
            runValidators: true
        })
    },

    async findByName(name) {
        // Abstracting the regex logic here keeps the controller clean
        return await Person.find({ name: new RegExp(`^${name}$`, 'i') })
    },

    async countAllPersons() {
        return await Person.countDocuments({})
    }
}

module.exports = PersonService