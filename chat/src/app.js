import express from "express";
import { engine } from "express-handlebars";
import path from "path"
import http from "http"
import url from "url";
import __dirname from "./utils.js";
const pathView = path.join(`${__dirname}/views`);
import  chatRouter from "./routes/chat.router.js"
import { Server } from "socket.io";
import conectaNaDataBase from "./dao/dbConnect.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(__dirname + "/../public"));
app.use("/", chatRouter);

const conexao = await conectaNaDataBase();
conexao.on("error", (erro) => {
  console.error("erro de conexao", erro);
})

conexao.once("open", () => {
  console.log("conexão feita com sucesso")
})

const messages = [];
//criando conexão com o usuario
io.on("connection", (socket) => {
  //console.log("Usuário conectado");
  socket.emit("messages", {}); // disparando um evento com objeto vazio

  // recebendo o nome do usuario conectado e exibindo no terminal
  socket.on("userName", function (data) {
    
    socket.broadcast.emit('userConnected', data); // evento usado para notificar todos os clientes conectados, exceto o cliente atual
  });
  // recebendo mensagens enviadas pelo cliente
  socket.on("message", function (data) {
    //console.log(data); // exibe a mensagem recebida
    messages.push(data); // adiciona a mensagem recebida ao array de mensagens
    io.sockets.emit("messageLogs",messages);
    //emite um evento para todos os clientes, o array de mensagens "messages" é enviado junto com o evento
  });
});

export default server;
