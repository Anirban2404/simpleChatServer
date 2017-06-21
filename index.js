// Developing the Backend
var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// Creating the view
app.set('views', __dirname + '/views');
// Setting up the view engine
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

// creating socket io handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

