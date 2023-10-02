//1 - configuração do acesso 
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Ong', {
    useNewUrlParser: true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Falha na conexão!!!'))

db.once('open', ()=>{
    console.log("Conexão com o banco de dados realizada com sucesso!!!");
});

//2 - criando o schema
const usuarioSchema = new mongoose.Schema({
    email : String,
    senha : String,
})

//3 - criando a model(o nome da collection no mongodb)
const Usuario = mongoose.model("Usuarios", usuarioSchema);

//4 - cadastrando varios dados com insertMany
Usuario.insertMany([
    {email : 'lucas@gmail.com', Senha : 'lucas789'},
    {email : 'marcos@gmail.com', Senha : 'marcos456'},
    {email : 'ana@gmail.com', Senha : 'ana123'}
])

async function findUsuario(){
    try {
        const usuario = await Usuario.find();
        console.log('Usuario :', usuario)
    }
    catch(error){
        console.error('Usuario não encontrado : ',error)
    }
}
findUsuario();