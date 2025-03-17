// Importa a classe Router do Express para criar um roteador modular.
import { Router } from "express";

// Importa as interfaces Request e Response para tipagem forte dos parâmetros.
import { Request, Response } from "express";

//Importação dos controllers de autentificação
import * as auth from '../controllers/auth';

//Importação dos controllers de eventos
import * as events from '../controllers/events';

// Cria uma nova instância do roteador Express.
const router = Router();

// Define a rota de login
router.post('/login', auth.login);

// Define uma rota GET para '/ping'.
router.get('/ping', auth.validate, (req, res) => {
  res.json({ pong: true, admin: true });
});

router.get('/events', auth.validate, events.getAll);


// Exporta o roteador configurado para ser usado em outros arquivos.
export default router;