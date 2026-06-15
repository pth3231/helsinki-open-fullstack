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

if (process.argv.length < 4) {
    console.log('give a personName');
    process.exit(1);
}
const personName = process.argv[3];

if (process.argv.length < 5) {
    console.log('give a personNumber');
    process.exit(1);
}
const personNumber = process.argv[4];

const newPerson = new Person({
    name: personName,
    number: personNumber
});

newPerson.save()
    .then(res => {
        console.log('a new person has been added!', newPerson);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => mongoose.connection.close())
