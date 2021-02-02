const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/ng-auction'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + 'dist/ng-auction/index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Console listening!');