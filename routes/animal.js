/**
 * Created by hoangnn on July, 12, 2021.
 */
let Animal = require("../model/animal");

/*
 * GET /animals route to retrieve all the animals.
 */
let getAnimals = (req, res) => {
    Animal.find((err, animals) => {
        if (err) {
            res.send(err); // :D
            return;
        }
        res.send(animals);
    });
};

/*
 * POST /animal to save a new animal.
 */
let postAnimal = (req, res) => {
    let animal = req.body;
    Animal.save(animal, (err, newAnimal) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Animal successfully added!",
            animal: newAnimal
        });
    });
};

/*
 * GET /animals/:id route to retrieve a animal given its id.
 */
let getAnimal = (req, res) => {
    Animal.findById(req.params.id, (err, animal) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send({
            animal
        });
    })
};

/*
 * DELETE /animals/:id to delete a animal given its id.
 */
let deleteAnimal = (req, res) => {
    Animal.delete(req.params.id, (err, result) => {
        res.json({
            message: "Animal successfully deleted!",
            result
        });
    })
};

/*
 * PUT /animal/:id to update a animal given its id
 */
let updateAnimal = (req, res) => {
    Animal.update(req.params.id, req.body, (err, animal) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Animal updated!",
            animal
        });
    })
};

//export all the functions
module.exports = {
    getAnimals,
    postAnimal,
    getAnimal,
    deleteAnimal,
    updateAnimal
};