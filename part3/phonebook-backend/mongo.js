const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password, name and number as arguments: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.j9wa0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(result => {
    console.log(`added ${name} ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('phonebook:');
  Person.find({}).then(persons => {
    mongoose.connection.close();
    persons.map(person => {
      console.log(`${person.name} ${person.number}`);
    });
  });
}

