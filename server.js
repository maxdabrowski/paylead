const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/client2'));

app.get('/*', (req,res) => {
 res.sendFile(path.join(__dirname + 'dist/client2/index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Console listening!');