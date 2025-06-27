import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

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

    return res.status(200).json({ message: 'Письмо успешно отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    return res.status(500).json({ error: 'Ошибка при отправке письма' });
  }
}




// Запуск сервера на localhost
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
