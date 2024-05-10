import { Request, Response } from 'express';
import { peopleService } from '../../services/peopleService';
import { body, validationResult } from 'express-validator';
import { Person } from '../../models/person';



const personValidationRules = [
  body('nombre')
    .trim() 
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras y espacios.'),

  body('altura')
    .isNumeric().withMessage('La altura debe ser un número.')
    .custom((value) => parseFloat(value) > 0).withMessage('La altura debe ser un valor mayor que cero.'),

  body('masa')
    .isNumeric().withMessage('La masa debe ser un número.')
    .custom((value) => parseFloat(value) > 0).withMessage('La masa debe ser un valor mayor que cero.'),

  body('colorDeCabello')
    .notEmpty().withMessage('El color de cabello es obligatorio.'),

  body('colorDePiel')
    .notEmpty().withMessage('El color de piel es obligatorio.'),

  body('colorDeOjos')
    .notEmpty().withMessage('El color de ojos es obligatorio.'),

  body('añoDeNacimiento')
    .notEmpty().withMessage('El año de nacimiento es obligatorio.')
    .matches(/^[0-9]+BBY$/).withMessage('El año de nacimiento debe ser un número seguido por "BBY".'),

  body('genero')
    .notEmpty().withMessage('El género es obligatorio.')
    .isIn(['male', 'female', 'other']).withMessage('El género debe ser "male", "female" o "other".'),
  body('mundoNatal').isURL().withMessage('El mundo natal debe ser una URL válida.'),
  body('peliculas').isArray().withMessage('Las películas deben ser un array de URLs.'),
  body('especies').isArray().withMessage('Las especies deben ser un array de URLs.'),
  body('vehiculos').isArray().withMessage('Los vehículos deben ser un array de URLs.'),
  body('navesEstelares').isArray().withMessage('Las naves estelares deben ser un array de URLs.'),
];


export async function createPerson(req: Request, res: Response) {
  
  await Promise.all(personValidationRules.map(validation => validation.run(req)));

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPersonData = req.body; 
    const newPerson = await peopleService.createPerson(newPersonData);
    res.status(201).json(newPerson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Error');
    }
  }
}

export async function getPerson(req: Request, res: Response) {
  try {
    const person = await peopleService.getPerson(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).send('Persona no registrada');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Error');
    }
  }
}



