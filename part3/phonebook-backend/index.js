require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require('./models/person');
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time :body"));

app.get("/info", (request, response) => {
  let info = `Phonebook has info for ${persons.length} people`;
  info = info + "\n" + new Date().toString();
  response.setHeader("Content-Type", "text/plain");
  response.send(info);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  if (id.length !== 24) {
    response.status(400).end();
  } else {
    Person.findById(id).then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).send("Requested person does not exist in phonebook.");
      }
    });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then(result => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "The name or phone number is missing",
    });
  }

  // if (persons.find((item) => item.name === body.name)) {
  //   return response.status(400).json({
  //     error: "The name must be unique",
  //   });
  // }

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.create(person).then(person => {
    response.json(person);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
