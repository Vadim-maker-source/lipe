import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';

dotenv.config();

const app = express();

// Настройки CORS
app.use(cors());
app.use(express.json());

// Preflight
app.options('/send-email', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://lipart.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

// Основной маршрут
app.post('/send-email', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://lipart.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER,
    subject: `Новое сообщение от ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Письмо успешно отправлено!' });
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    res.status(500).json({ error: 'Ошибка при отправке письма' });
  }
});

// 📦 Экспорт хендлера для Vercel
const server = createServer(app);

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return server.emit('request', req, res);
}


// Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
