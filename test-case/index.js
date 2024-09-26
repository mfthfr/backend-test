const express = require('express');
const app = express();
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// root endpoint
app.get('/', (req, res) => {
    res.send('Selamat datang di Sistem API');
});

const PORT = process.env.PORT || 3000;

const sequelize = require('./config/database');
const Member = require('./models/member');
const Book = require('./models/book');

const memberRoutes = require('./routes/member');
const bookRoutes = require('./routes/book');

app.use('/api/members', memberRoutes);
app.use('/api/books', bookRoutes);

sequelize.sync({force:true}).then(() => {
    console.log('Database dan Table berhasil dibuat');
    app.listen(PORT, () => {
        console.log(`Server Berjalan di http://localhost:${PORT}`);
    });
});