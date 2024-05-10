"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllPeople = void 0;
const axios_1 = __importDefault(require("axios"));
const peopleService_1 = require("../services/peopleService");
async function listAllPeople(req, res) {
    try {
        const localPeople = await peopleService_1.peopleService.listPeople();
        const response = await axios_1.default.get('https://swapi.py4e.com/api/people/');
        const swapiPeople = response.data.results;
        const translatedPeople = swapiPeople.map((person) => ({
            nombre: person.name,
            altura: person.height,
            masa: person.mass,
            colorDeCabello: person.hair_color,
            colorDePiel: person.skin_color,
            colorDeOjos: person.eye_color,
            añoDeNacimiento: person.birth_year,
            genero: person.gender,
            mundoNatal: person.homeworld,
            peliculas: person.films,
            especies: person.species,
            vehiculos: person.vehicles,
            navesEstelares: person.starships,
            creado: person.created,
            editado: person.edited,
            url: person.url
        }));
        const combinedResults = [...localPeople, ...translatedPeople];
        res.json(combinedResults);
    }
    catch (error) {
        console.error('Error obteniendo personas:', error);
        res.status(500).send('Error al obtener la información');
    }
}
exports.listAllPeople = listAllPeople;
