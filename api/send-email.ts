// api/send-email.ts
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `Новое сообщение от ${name}`,
      text: message,
    });

    res.status(200).json({ message: 'Письмо отправлено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при отправке письма' });
  }
});

export const handler = serverless(app);



// Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
