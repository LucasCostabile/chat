import mongoose from "mongoose"


async function conectaNaDataBase() {
    mongoose.connect("mongodb+srv://lucascostabile23:Teste23teste@cluster0.nxhyfcm.mongodb.net/ecommerce?retryWrites=true&w=majority")
    
    return mongoose.connection
}

export default conectaNaDataBase;