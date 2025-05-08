const express = require('express');
const app = express();
const port = 3000;

let latestUID = '';

app.use(express.json());
app.use(express.static('public'));

app.post('/api/grant-access', (req, res) => {
  try {

    const uid = req.body.uid;
    const isauth = req.body.isauth;
    if (isauth) {
      console.log('Access granted to UID:', uid);
      latestUID = uid;
    } else latestUID = '';
    res.sendStatus(200);
  } catch {
    console.log(req.body)
  }
});


app.get('/search', (req, res) => {
    const category = req.query.category;
    res.send(`Search Query: ${queryTerm}, Category: ${category}`);
});

app.get('/api/latest-uid', (req, res) => {
  res.json({ uid: latestUID });
});

app.get('/api/reset', (req, res) => {
  latestUID = ""
  res.send(200);
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
