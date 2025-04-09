// Importing modules
const swaggerJSDoc = require('swagger-jsdoc');
// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Charp API',
            version: '1.0.0',
            description: 'charp API swagger documentation'
        },
        servers:[
            {
                url: 'http://localhost:3000/api/v1',
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