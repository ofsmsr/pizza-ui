var express = require('express'),
    app = express(),
    port = process.env.PORT || 9001;

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/views', express.static(__dirname + '/views'));

app.all('*', function(req, res, next) {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.listen(port);
console.log('The pizza-ui is running on: ' + port);