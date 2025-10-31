import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const router = express.Router();

const serviceClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const anonClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ message: 'Preencha email, senha e nome.' });

    const { data, error } = await serviceClient.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
    });

    if (error) return res.status(400).json({ message: error.message });

    // Faz login automático após criar conta
    const { data: loginData, error: loginErr } = await anonClient.auth.signInWithPassword({
      email,
      password,
    });
    if (loginErr) return res.status(201).json({ user: data.user, token: null });

    res.status(201).json({
      user: {
        id: loginData.user.id,
        email: loginData.user.email,
        name,
      },
      token: loginData.session.access_token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email e senha obrigatórios.' });

  const { data, error } = await anonClient.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ message: 'Credenciais inválidas.' });

  res.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || '',
    },
    token: data.session.access_token,
  });
});

export default router;
