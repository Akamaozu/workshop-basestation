var citizen = require('supe'),
    express = require('express')(),
    server = require('http').Server( express ),
    socketio = require('socket.io')( server ),

    connection_status = false;

server.listen( process.env.PORT || 80 );

express.get('/', function( req, res ){

  res.send( 'hello world' );
});

socketio.on( 'connection', function( socket ){

  console.log( 'new socket.io client connection' );

  socket.on( 'connection-status-request', function(){    
    socket.emit( 'connection-status', connection_status );
  });

  socket.on( 'file-upload', function( data ){

    console.log( 'received ' + data.name );
  });
});

citizen.noticeboard.watch( 'toggle-connection-status', 'do-toggle', function(){

  connection_status = !connection_status;
  socketio.emit( 'connection-status', connection_status );
});