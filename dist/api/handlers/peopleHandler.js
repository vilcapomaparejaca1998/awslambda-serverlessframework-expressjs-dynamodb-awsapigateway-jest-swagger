"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = exports.createPerson = void 0;
const peopleService_1 = require("../../services/peopleService");
const express_validator_1 = require("express-validator");
const personValidationRules = [
    (0, express_validator_1.body)('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras y espacios.'),
    (0, express_validator_1.body)('altura')
        .isNumeric().withMessage('La altura debe ser un número.')
        .custom((value) => parseFloat(value) > 0).withMessage('La altura debe ser un valor mayor que cero.'),
    (0, express_validator_1.body)('masa')
        .isNumeric().withMessage('La masa debe ser un número.')
        .custom((value) => parseFloat(value) > 0).withMessage('La masa debe ser un valor mayor que cero.'),
    (0, express_validator_1.body)('colorDeCabello')
        .notEmpty().withMessage('El color de cabello es obligatorio.'),
    (0, express_validator_1.body)('colorDePiel')
        .notEmpty().withMessage('El color de piel es obligatorio.'),
    (0, express_validator_1.body)('colorDeOjos')
        .notEmpty().withMessage('El color de ojos es obligatorio.'),
    (0, express_validator_1.body)('añoDeNacimiento')
        .notEmpty().withMessage('El año de nacimiento es obligatorio.')
        .matches(/^[0-9]+BBY$/).withMessage('El año de nacimiento debe ser un número seguido por "BBY".'),
    (0, express_validator_1.body)('genero')
        .notEmpty().withMessage('El género es obligatorio.')
        .isIn(['male', 'female', 'other']).withMessage('El género debe ser "male", "female" o "other".'),
    (0, express_validator_1.body)('mundoNatal').isURL().withMessage('El mundo natal debe ser una URL válida.'),
    (0, express_validator_1.body)('peliculas').isArray().withMessage('Las películas deben ser un array de URLs.'),
    (0, express_validator_1.body)('especies').isArray().withMessage('Las especies deben ser un array de URLs.'),
    (0, express_validator_1.body)('vehiculos').isArray().withMessage('Los vehículos deben ser un array de URLs.'),
    (0, express_validator_1.body)('navesEstelares').isArray().withMessage('Las naves estelares deben ser un array de URLs.'),
];
async function createPerson(req, res) {
    await Promise.all(personValidationRules.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newPersonData = req.body;
        const newPerson = await peopleService_1.peopleService.createPerson(newPersonData);
        res.status(201).json(newPerson);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Error');
        }
    }
}
exports.createPerson = createPerson;
async function getPerson(req, res) {
    try {
        const person = await peopleService_1.peopleService.getPerson(req.params.id);
        if (person) {
            res.json(person);
        }
        else {
            res.status(404).send('Persona no registrada');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Error');
        }
    }
}
exports.getPerson = getPerson;
