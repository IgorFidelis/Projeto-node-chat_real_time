const app = require('./config/server')

app.listen(80,()=>{
    console.log("Servidor rodando no http://localhost:80");
})