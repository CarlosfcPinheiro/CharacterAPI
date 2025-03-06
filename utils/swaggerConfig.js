// Importing modules
const swaggerJSDoc = require('swagger-jsdoc');
// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Y API',
            version: '1.0.0',
            description: 'Documentação da API do Y'
        },
        servers:[
            {
                url: 'http://localhost:3000',
                description: 'Local'
            },
        ],
        components:{
            securitySchemes:{
                BearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security:[
            {
                BearerAuth: [],
            }
        ]
    },
    apis: ['./routes/*.js'],
};
// Generate swagger options
const swaggerDocs = swaggerJSDoc(options);
// Exporting swagger docs
module.exports = swaggerDocs;