# 🧠 NSE Chatbot – Frontend

A sleek, professional, and fast frontend interface for the **NSE Chatbot**, built using **React** and **TailwindCSS**, themed to match the National Stock Exchange of India’s brand. This chatbot provides intelligent, real-time stock market insights, charts, fundamentals, IPOs, earnings calendar, and more.

## 🚀 Features

- ⚡ Clean, modern, and responsive UI
- 🎨 NSE-themed color palette (Purple, Red, Orange, Yellow)
- 🤖 Conversational interface with “Typing...” animation
- 📰 One-click access to latest NSE news
- 📈 View charts, fundamentals, IPOs, gainers/losers, earnings
- 👤 User name and email capture with greeting personalization
- 🌐 Hosted on Cloudflare Pages, fully optimized for performance

## 🧰 Tech Stack

- **React.js** – Component-based UI library
- **TailwindCSS** – Utility-first CSS framework
- **ShadCN/UI** – Pre-styled UI components
- **Framer Motion** – Smooth animations
- **Axios** – API communication with backend
- **Vite** – Fast frontend build tool

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/nse-chatbot-frontend.git
cd nse-chatbot-frontend
npm install
```

## 🛠️ Configuration

Create a `.env` file in the root with:

```env
VITE_API_BASE_URL=https://nse-chatbot-bn.onrender.com
```

Adjust the URL if your backend is running locally or on a different host.

## 🧪 Run Locally

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧱 Project Structure

```
src/
├── components/
│   ├── ChatWindow.jsx
│   ├── UserInfoModal.jsx
│   └── ...
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Brand Colors

```css
--nse-purple: #3a2d7d;
--nse-red:    #e22128;
--nse-orange: #f26c23;
--nse-yellow: #efb31f;
```

Used throughout the UI to reflect the official NSE theme.

## 🌐 Deployment

This frontend is deployed using **Cloudflare Pages**.

To deploy:

1. Push your code to a GitHub repository.
2. Connect it to Cloudflare Pages.
3. Set the build command as `npm run build` and the output directory as `dist`.

## 🤝 Contributions

Feel free to fork, improve, and submit PRs. For major changes, please open an issue first to discuss the idea.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with ❤️ by a intern for NSE**
Developed by **Jerin Joseph Alour**  
🔗 [jerin.cloud](https://jerin.cloud)
