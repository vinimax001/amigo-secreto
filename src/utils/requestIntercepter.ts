// Importa o tipo RequestHandler do Express, que define a assinatura de um middleware.
import { RequestHandler } from "express";

// Imprime no console informações sobre a requisição e resposta.
    // ➡️: Indica o início do log.
    // ${res.statusCode}: Código de status da resposta (ex: 200, 404, 500).
    // ${req.method}: Método HTTP da requisição (ex: GET, POST, PUT, DELETE).
    // ${req.originalUrl}: URL original da requisição.
    // ${JSON.stringify(req.body)}: Corpo da requisição convertido para string JSON.
export const requestIntercepter : RequestHandler = (req, res, next) => {
    console.log(`➡️ ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    // Chama a próxima função middleware na cadeia.
    // É essencial chamar 'next()' para que a requisição continue seu fluxo até as rotas e outros middlewares subsequentes.
    next();
}