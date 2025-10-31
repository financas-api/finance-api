import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import txRoutes from './routes/transactions.js';
import { setupSwagger } from "./src/swagger.js";

dotenv.config();
const app = express();

setupSwagger(app);

app.get("/", (req, res) => {
  res.send(`
    <div style="
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      background-color: #0d1117;
      color: #58a6ff;
      margin: 0;
    ">
      <h1 style="font-size: 2.5rem; margin-bottom: 10px;">🚀 Digital Money API</h1>
      <p style="font-size: 1.2rem;">
        Bem-vindo à API financeira!  
        <a href="/api-docs" style="color: #f0b90b; text-decoration: none;">Acesse a documentação, é só seguir e tá pronto o sorvetinho.</a>
      </p>
    </div>
  `);
});


app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
