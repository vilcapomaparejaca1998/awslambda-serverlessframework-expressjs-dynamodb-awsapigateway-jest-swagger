import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { listAllPeople } from './peopleController';
import { peopleService } from '../services/peopleService';
import axios from 'axios';

jest.mock('../services/peopleService', () => ({
  peopleService: {
    listPeople: jest.fn().mockResolvedValue([{ nombre: "Ejemplo Persona", altura: "180" }])
  }
}));

const app = express();
app.use(bodyParser.json());
app.get('/all', listAllPeople);

describe('Controlador de Personas', () => {
  it('debería devolver un array combinado de personas locales y de SWAPI', async () => {
    const res = await request(app).get('/all');
    expect(res.status).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('nombre');
  });

  it('debería manejar correctamente un fallo en la API externa', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Fallo en la API externa'));
    const res = await request(app).get('/all');
    expect(res.status).toEqual(500);
    expect(res.text).toContain('Error al obtener la información');
  });

  it('debería devolver un array vacío cuando no hay personas de fuentes locales ni de SWAPI', async () => {
    jest.spyOn(peopleService, 'listPeople').mockResolvedValue([]);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { results: [] } });
    const res = await request(app).get('/all');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });
});
