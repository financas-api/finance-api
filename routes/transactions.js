import express from 'express';
import { supabase } from '../lib/supabaseClient.js';

const router = express.Router();

async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token ausente' });

  const token = header.split(' ')[1];
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ message: 'Token inválido' });

  req.user = data.user;
  next();
}

// Listar transações do usuário
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', req.user.id)
    .order('date', { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

// Criar transação
router.post('/', requireAuth, async (req, res) => {
  const { type, amount, description, date } = req.body;
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: req.user.id,
      type,
      amount,
      description,
      date: date || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
});

// Atualizar
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { type, amount, description, date } = req.body;
  const { data, error } = await supabase
    .from('transactions')
    .update({ type, amount, description, date })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

// Deletar
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('transactions').delete().eq('id', id).eq('user_id', req.user.id);
  if (error) return res.status(500).json({ message: error.message });
  res.status(204).send();
});

export default router;
