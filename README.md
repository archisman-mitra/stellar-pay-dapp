<div align="center">

# 🌌 StellarPay

**A Web3 payment dashboard built on the Stellar Testnet.**  
Connect your Freighter wallet, check your XLM balance, and send payments — all from a clean, minimal UI.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Stellar](https://img.shields.io/badge/Stellar-Testnet-7B61FF?style=flat&logo=stellar)](https://stellar.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📸 Screenshots

| Wallet Connected | Balance | Send Payment | Success |
|---|---|---|---|
| ![Wallet](./screenshots/Screenshot%202026-04-25%20220805.jpg) | ![Balance](./screenshots/Screenshot%202026-04-25%20220922.jpg) | ![Send](./screenshots/Screenshot%202026-04-25%20221229.jpg) | ![Success](./screenshots/Screenshot%202026-04-25%20221511.jpg) |

> **Transaction on Stellar Explorer (proof of deployment)**  
> ![Explorer](./screenshots/Screenshot%202026-04-25%20221628.jpg)

---

## ✨ Features

- 🔐 **Wallet Connect / Disconnect** via Freighter
- 💰 **Live XLM Balance** fetched from Stellar network
- 💸 **Send XLM Payments** with real-time success/failure feedback
- 📜 **Transaction History** with hash display
- 🔗 **Explorer Links** — every transaction is verifiable on Stellar Expert

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Tailwind CSS |
| Blockchain | Stellar SDK (Testnet) |
| Wallet | Freighter Browser Extension |
| Explorer | [stellar.expert/testnet](https://stellar.expert/explorer/testnet) |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Freighter Wallet](https://www.freighter.app/) browser extension

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/stellarpay.git
cd stellarpay

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Transactions

1. Install the [Freighter Wallet](https://www.freighter.app/) extension
2. Switch Freighter to **Testnet** in settings
3. Fund your testnet account using **Friendbot**:  
   👉 [https://friendbot.stellar.org/](https://friendbot.stellar.org/)
4. Connect your wallet in the app
5. Send XLM to any other testnet address
6. Verify the transaction on [Stellar Expert](https://stellar.expert/explorer/testnet)

> ⚠️ This project runs entirely on **Stellar Testnet** — no real funds are involved.

---

## ✅ Project Checklist

- [x] Freighter wallet setup (Testnet)
- [x] Wallet connect & disconnect
- [x] Fetch and display XLM balance
- [x] Send XLM transaction
- [x] Transaction success / failure feedback
- [x] Transaction hash with Explorer link

---

## 🚀 Planned Improvements

- [ ] Balance history chart
- [ ] Mobile responsiveness polish
- [ ] Transaction search & filter
- [ ] Dark / Light mode toggle

---

## 👨‍💻 Author

**Archisman Mitra** — [GitHub](https://github.com/archisman-mitra)

If this project was useful, a ⭐ on GitHub is appreciated!
