import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email и код обязательны' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // или другой SMTP сервис
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Регистрация Липецк ART',
      text: `Ваш код подтверждения регистрации: ${code}`,
    });

    return res.status(200).json({ message: 'Код подтверждения отправлен' });
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return res.status(500).json({ error: 'Ошибка отправки письма' });
  }
}
