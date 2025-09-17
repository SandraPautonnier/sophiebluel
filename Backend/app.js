const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const app = express();

// Configurer CORS pour autoriser uniquement ton frontend GitHub Pages
app.use(cors({
  origin: 'https://sandrapautonnier.github.io/Portfolio-architecte-sophie-bluel-master/', // <-- Remplace par l'URL de ton frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  credentials: true // si tu utilises les cookies ou l'authentification
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Base de données et routes
const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');

db.sequelize.sync().then(() => console.log('db is ready'));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;

