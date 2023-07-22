const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];

app.get('/', (req, res) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  res.render('index', { tasks: tasks, currentDate: currentDate });
});

app.post('/', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Inderjeet

