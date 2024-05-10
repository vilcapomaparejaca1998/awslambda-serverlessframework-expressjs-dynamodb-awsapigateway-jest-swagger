const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Star Wars',
      version: '1.0.0',
      description: 'Esta es una API de Star Wars que combina información local con datos de SWAPI.',
    },
  },
  apis: ['./src/**/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

require('fs').writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf-8');
