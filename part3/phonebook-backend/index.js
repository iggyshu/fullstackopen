require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require('./models/person');
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time :body"));

app.get("/info", (request, response) => {
  Person.count((err, res) => {
    if (err) { console.log(err); }
    let info = `Phonebook has info for ${res} people`;
    info = info + "\n" + new Date().toString();
    response.setHeader("Content-Type", "text/plain");
    response.send(info);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).send("Requested person does not exist in phonebook.");
    }
  }).catch(error => {
    next(error)
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then(result => {
    response.status(204).end();
  }).catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  body = request.body;
  if (!body.number || !body.name) {
    response.status(400).json({
      error: "The name or phone number is missing",
    });
  } else {
    Person.findOne({ name: body.name }).then(person => {
      if (person) {
        response.status(400).json({
          error: "The name must be unique",
        });
      } else {
        const person = {
          name: body.name,
          number: body.number,
        };
        Person.create(person).then(person => {
          response.json(person);
        })
        .catch(error => next(error));
      }
    });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
