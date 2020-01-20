/* Import config do server */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function() {
    console.log('Server Online');
})

// Direcionar todas as requisições websocket para a mesma porta do server.
// Websocket permite comunicação bi-direcional entre server e páginas ou sistemas web.
 var io = require('socket.io').listen(server);

 app.set('io', io); //variável Global

/* Cria conexão por websocket, instância do obj io no front chama o evento connection no server*/
io.on('connection', function(socket){
    console.log('Usuário conectou!');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou!');
    })

    
    socket.on('msgParaServidor', function(data){
        /* diálogos */
        socket.emit(
            'msgCliente',
            {apelido: data.apelido, mensagem: data.mensagem} 
        );

        socket.broadcast.emit(
            'msgCliente',
            {apelido: data.apelido, mensagem: data.mensagem} 
        );

        /* Participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido} 
            );
    
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido} 
            );
        };
    });
});