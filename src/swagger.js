import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * 🧱 CONFIGURAÇÃO BASE DO SWAGGER
 * Aqui a gente define as informações gerais da API:
 * nome, versão, descrição, e até a URL base do servidor.
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "💰 Digital Money API",
      version: "1.0.0",
      description: `
Esta é a **documentação oficial da Digital Money API**.

> API desenvolvida com **Node.js**, **Express**, **Supabase** e **Sequelize**.

Ela oferece endpoints para:
- 🔐 Autenticação de usuários (login e registro)
- 💸 Gerenciamento de transações financeiras
- 🔗 Integração total com o front-end em React + Vite

---

🧠 **Como usar:**
1. Clique em **Authorize** e insira o token JWT (após fazer login)
2. Execute os endpoints diretamente daqui
3. Veja as respostas e valide tudo visualmente

---

✨ **Dica:** Essa documentação foi feita com carinho por *Yukas Tech*.

<br>
<div align="center" style="font-weight: bold; font-size: 18px; color: #3b82f6;">
🍦 Ai é só mexer que tá pronto o sorvetinho 😎
</div>
      `,
      contact: {
        name: "Equipe Digital Money",
        url: "https://github.com/financas-api",
      },
    },

    /**
     * Aqui configuramos o servidor local (ou outros ambientes, se quiser).
     */
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local de desenvolvimento",
      },
    ],

    /**
     * Configuração de autenticação JWT no Swagger.
     * Assim você pode logar e testar endpoints protegidos direto da UI.
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  /**
   * Aqui indicamos onde o Swagger deve procurar os comentários
   * com as definições dos endpoints (nas pastas de rotas).
   */
  apis: ["./src/routes/*.js"],
};

// Gera o objeto com base nas configs acima
export const swaggerSpec = swaggerJsdoc(options);

/**
 * Função que aplica o Swagger na aplicação.
 * Assim, ao acessar http://localhost:4000/api-docs
 * você vê toda a documentação interativa.
 */
export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info h2 { color: #3b82f6; font-weight: bold }
      .swagger-ui .markdown p, .swagger-ui .info p { font-size: 15px; line-height: 1.6 }
      .swagger-ui .info a { color: #3b82f6 !important; text-decoration: none }
      .swagger-ui .info a:hover { text-decoration: underline }
      .swagger-ui .info div[align="center"] { margin-top: 40px; }
    `,
    customSiteTitle: "Digital Money API 🍦",
  }));
};
