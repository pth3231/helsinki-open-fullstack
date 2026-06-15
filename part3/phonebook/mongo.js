const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give a password as an argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://Haven:${password}@helsinkiopencourse.kbd0bfm.mongodb.net/phonebook?retryWrites=true&w=majority&appName=HelsinkiOpenCourse`;
mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const personSchema = mongoose.Schema({
    name: String,
    number: String
}, { collection: 'persons' });

const Person = mongoose.model('Person', personSchema);

function createNewPerson(name, number) {
    const newPerson = new Person({
        name: name,
        number: number
    });

    newPerson.save()
        .then(res => {
            console.log('a new person has been added!', newPerson);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => mongoose.connection.close());
}

function findAllPerson() {
    Person.find({})
        .then(persons => {
            console.log("phonebook:");
            for (const p of persons) {
                console.log(p.name, p.number);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => mongoose.connection.close());
}

if (process.argv.length < 5) {
    findAllPerson();
}
else {
    const personName = process.argv[3];
    const personNumber = process.argv[4];
    createNewPerson(personName, personNumber);
}
