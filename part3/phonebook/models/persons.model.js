const mongoose = require('mongoose');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const url = process.env.MONGODB_URL;
console.log("connecting to ", url);

mongoose.connect(url, {family: 4})
    .then(res => {
        console.log("connected to mongodb");
    })
    .catch(err => {
        console.log("cannot connect to mongodb: ", err.message)
    });
 
const personSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true}
}, { collection: 'persons' });

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Person', personSchema);