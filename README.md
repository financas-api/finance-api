# 💰 Digital Money API

API desenvolvida com Node.js, Express e Supabase para gerenciamento de finanças pessoais.  
Inclui autenticação de usuários, registro de transações (entradas e saídas) e integração completa com o front-end **Digital Money** (Vite + React).

---

## 🚀 Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-316192?style=for-the-badge&logo=sequelize&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📦 Instalação e Configuração

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/financas-api/finance-api.git

cd finance-api

2️⃣ Instale as dependências
npm install

3️⃣ Crie um arquivo .env na raiz e adicione:
PORT=4000
SUPABASE_URL=https://seu_projeto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
CORS_ORIGIN=http://localhost:5173

4️⃣ Execute a aplicação
npm run dev

A API rodará em:
👉 http://localhost:4000 e tá pronto o sorvetinho.
