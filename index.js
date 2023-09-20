const express = require('express');
const app = express();

const path = require('path');
const basePath = path.join(__dirname, 'templates');

let pedidos = [];

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/', (req, resp) => {
    resp.sendFile(`${basePath}/home.html`);
});

app.get('/pedido', (req, resp) => {
    resp.sendFile(`${basePath}/pedido.html`);
});

app.post('/criarPedido', (req, resp) => {
    const lanche = req.body.lanche;
    const nome = req.body.nome;

    const pedido = {
        cliente: nome,
        lanche: lanche
    }

    pedidos.push(pedido);
    resp.redirect('/pedidos');
});

app.get('/pedidos', (req, resp) => {
    resp.sendFile(`${basePath}/pedidos.html`);
});

app.get('/pedidos/:nome', (req, resp) => {
    const nome = req.query.nome;
    pedidos.forEach((pedido) => {
        if (pedido.cliente.toLowerCase() == nome.toLowerCase()) {
            console.log(`Cliente: ${pedido.cliente} | Lanche: ${pedido.lanche}`);
        }
    });
});

app.listen(5000);