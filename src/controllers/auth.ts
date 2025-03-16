// Importa a classe Router do Express para criar um roteador modular.
import { Router } from "express";

// Importa o tipo RequestHandler do Express para definir a função manipuladora.
import { RequestHandler } from "express";

// Importa a biblioteca Zod para realizar a validação de dados.
import { z } from "zod";

// Importa as funções de autentificação do service/auth
import * as auth from '../services/auth';

// Define a função manipuladora de requisições para o endpoint de login.
export const login: RequestHandler = (req, res) => {
    // Define um esquema de validação usando Zod para o corpo da requisição.
    const loginSchema = z.object({
        password: z.string() // Define que o corpo da requisição deve conter um campo "password" do tipo string.
    });
    
    // Tenta analisar e validar o corpo da requisição usando o esquema definido.
    const body = loginSchema.safeParse(req.body);
    // Verifica se a validação foi bem-sucedida.
    if (!body.success) {
        // Se a validação falhar, retorna uma resposta JSON com um erro
        res.json ({ error: 'Dados inválidos.'});
        return; // Certifique-se de retornar aqui para evitar execução adicional
    }
    //Validar a senha e gerar o token
    if(!auth.validatePassword(body.data.password)) {
        res.status(403).json({ error: 'Acesso Negado' });
        return; // Certifique-se de retornar aqui para evitar execução adicional
    }
    res.json({ token: auth.createToken() });
}

export const validate: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(403).json({ error: 'Acesso Negado'});
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    if(!auth.validateToken(token)) {
        res.status(403).json({ error: 'Acesso Negado'});
        return;
    }
    
    next();
}