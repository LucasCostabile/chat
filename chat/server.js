import app from "../1-chat/src/app.js"

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });