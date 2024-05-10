import axios from 'axios';
import { Request, Response } from 'express';
import { peopleService } from '../services/peopleService';

interface SwapiPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export async function listAllPeople(req: Request, res: Response) {
    try {
        const localPeople = await peopleService.listPeople();
        const response = await axios.get('https://swapi.py4e.com/api/people/');
        const swapiPeople = response.data.results;

        const translatedPeople = swapiPeople.map((person: SwapiPerson) => ({
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
    } catch (error) {
        console.error('Error obteniendo personas:', error);
        res.status(500).send('Error al obtener la información');
    }
}

