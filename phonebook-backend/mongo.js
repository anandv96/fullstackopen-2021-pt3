const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.l9hqz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// show the whole phonebook
if (process.argv.length === 3) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    console.log("result is");
    console.log(result);
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
    process.exit(0);
  });
}

if (process.argv.length === 4) {
  console.log("missing name or number");
  process.exit(1);
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
    process.exit(0);
  });
}
