// Importa e configura o dotenv para carregar variáveis de ambiente do arquivo .env
import 'dotenv/config';

// Importa o framework Express para criar o servidor web
import express from 'express';

// Importa o middleware CORS para lidar com requisições de origens diferentes
import cors from 'cors'; 

// Importa o módulo HTTPS para criar servidores HTTPS
import https from 'https'; 

// Importa o módulo HTTP para criar servidores HTTP
import http from 'http';

// Importa o roteador 'siteRoutes'
import siteRoutes from './routes/site';
import { requestIntercepter } from './utils/requestIntercepter';

// Cria uma instância do aplicativo Express
const app = express(); 

// Usa o middleware CORS para habilitar requisições de origens diferentes
app.use(cors());

// Usa o middleware para analisar corpos de requisições JSON
app.use(express.json());

// Usa o middleware para analisar corpos de requisições URL-encoded
app.use(express.urlencoded({ extended: true })); 

// Monta o middleware 'requestIntercepter' para todas as requisições HTTP em todos os caminhos.
app.all('*', requestIntercepter);

//app.use('/admin', adminRoutes);
// Monta o roteador 'siteRoutes' na rota base '/'.
app.use('/', siteRoutes);

// Função para iniciar o servidor
const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Running at PORT ${port}`); // Exibe no console a porta em que o servidor está rodando
    });
}

// Cria um servidor HTTP regular usando a instância do Express
const regularServer = http.createServer(app);

// Verifica se o ambiente é de produção
if(process.env.NODE_ENV === 'production') {
    // TODO: configurar SSL (Certificado HTTPS) - Necessário para rodar em produção com HTTPS
    // TODO: rodar server na 80 (HTTP) e na 443 (HTTPS) - Configurar redirecionamento de 80 para 443

    // Observação: Em produção, você geralmente configuraria um servidor HTTPS (usando o módulo 'https') e redirecionaria as requisições HTTP para HTTPS.
    // Você precisaria de um certificado SSL válido para isso.
    // Normalmente se utiliza um serviço de proxy reverso como nginx ou um load balancer para tratar o certificado SSL e redirecionamento.
} else {
    // Se o ambiente não for de produção (desenvolvimento), obtém a porta do arquivo .env ou usa a porta 9000 como padrão
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    // Inicia o servidor HTTP na porta definida
    runServer(serverPort, regularServer);
}