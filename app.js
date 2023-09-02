const app = require('./config/server')

let server = app.listen(80,()=>{
    console.log("Servidor rodando no http://localhost:80");
});

let io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket)=>{
    console.log('Usuario conecto');

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectou');
    });

    socket.on('msgParaServidor', (data)=>{
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem} 
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem} 
        );



        if(parseInt(data.apelido_atualizado__nos_clientes) == 0){

            
            socket.emit(
                'parcipantesParaCliente',
                {apelido: data.apelido} 
                );

                socket.broadcast.emit(
            'parcipantesParaCliente',
            {apelido: data.apelido} 
            );
        }

    });

});