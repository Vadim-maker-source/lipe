import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://lipart.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.options('*', cors());

// POST /send-email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Транспорт Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Твоя gmail
      pass: process.env.GMAIL_PASS  // app password
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER,      // Куда отправлять письма
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

export default app

// Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
