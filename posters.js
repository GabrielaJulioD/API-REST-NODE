const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa CORS
const bodyParser = require("body-parser"); 
const app = express();
const port = 3000;
// Usa CORS con opciones predeterminadas (Access-Control-Allow-Origin: *)
app.use(cors());
app.use(bodyParser.json()); 
app.get('/posts', (req, res) => {
const url = 'https://jsonplaceholder.typicode.com/posts';
axios.get(url)
.then(response => {
res.json(response.data);
})
.catch(error => {
res.status(500).json({ error: 'Hubo un problema al obtener los posts'
});
});
});
app.listen(port, () => {
console.log(`Backend corriendo en http://localhost:${port}`);
});