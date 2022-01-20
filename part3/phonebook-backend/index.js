const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  let info = `Phonebook has info for ${persons.length} people`;
  info = info + "\n" + new Date().toString();
  response.setHeader("Content-Type", "text/plain");
  response.send(info);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((item) => item.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send("Requested person does not exist in phonebook.");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((item) => item.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.phone || !body.name) {
    return response.status(400).json({
      error: "The name or phone number is missing",
    });
  }

  if (persons.find((item) => item.name === body.name)) {
    return response.status(400).json({
      error: "The name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    phone: body.phone,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
