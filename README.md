# ☁️ Cloud Storage

A minimalist file and image cloud storage platform with a no-fuss, no-muss approach to saving data online.

![GitHub](https://img.shields.io/github/license/blitheryjibits/cloud-storage)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-Node.js%2C%20Express%2C%20Prisma%2C%20Tailwind-blue)

---

## 🚀 Features

- 🔐 User-based file and folder management
- 📁 Nested folder hierarchy with dynamic routing
- 📤 Upload and preview files instantly
- 🗑️ Batch selection and deletion with Google Cloud-style UX
- 🎨 Tailwind-powered responsive UI
- 🧠 Smart routing with optional folder context
- 🧩 Modular EJS partials for clean templating

---

## 🛠 Tech Stack

| Layer        | Tools & Libraries                          |
|--------------|--------------------------------------------|
| Backend      | Node.js, Express, Prisma ORM               |
| Database     | PostgreSQL                                 |
| Frontend     | EJS, Tailwind CSS                          |
| File Uploads | Multer (memory storage)                    |
| Auth         | Passport.js (or your preferred strategy)   |

---

## 📦 Installation

```bash
git clone https://github.com/blitheryjibits/cloud-storage.git
cd cloud-storage
npm install
```

Set up your `.env` file:

```env
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_secret
```

Run the app:

```bash
npm start
```

---

## 🧪 Usage

- Navigate to `/drive` to view your root folder.
- Click folders to drill down into nested views.
- Select files with single-click; double-click to open.
- Use the 🗑️ button to batch delete selected files.

---

## 📁 Folder Structure

```
cloud-storage/
├── Routers/
├── Controllers/
├── Views/
│   ├── partials/
│   └── drive.ejs
├── Prisma/
├── Styles/
├── app.js
└── package.json
```

---

## 🧠 Design Philosophy

This project emphasizes simplicity, modularity, and user-first UX. Inspired by platforms like Google Drive, it offers intuitive file management with minimal overhead.

---

## 📌 Roadmap

- [ ] Add drag-and-drop uploads
- [ ] Implement soft-delete (bin view)
- [ ] Add file previews for images and PDFs
- [ ] Role-based access control

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

Built with ❤️ by [blitheryjibits](https://github.com/blitheryjibits)  
Inspired by clean UX principles and cloud-native design.

