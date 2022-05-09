const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const indexApi = require('./routes/index.js');

const PORT = 3001;

const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
app.use('/api', indexApi);

app.use(express.static('public'));

//Get Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
//Get Route for NotesPage
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// app.get('/api/notes', (req, res) => {
//   fs.readFile('./database/db.json', 'utf8', function (error, data) {
//     if (error) console.error({ error: error });
//     console.log(data);
//     res.json(data);
//   });
// });

// app.post('/api/notes', (req, res) => {
//   console.log({ body: req.body });
//   //use fs.writefile to append the body to the database. read the database and save it as a variable so you can use PUSH on it like an array
// });

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
