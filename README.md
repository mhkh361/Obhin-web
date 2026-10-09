<div align="center">

# 🧠 OBHIN (অভিন) Web

**Next-Gen AI Productivity Platform & JARVIS Engine for South Asia**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.21-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<p align="center">
  বাঙালি এবং সাউথ এশিয়ান পেশাজীবী, ডেভেলপার ও ক্রিয়েটরদের জন্য নির্মিত পূর্ণাঙ্গ বুদ্ধিমত্তা ও কো-পাইলট প্ল্যাটফর্ম।
</p>

[Live Demo](https://obhin-web.vercel.app) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

**OBHIN (অভিন)** সাধারণ কোনো চ্যাটবট ইন্টারফেস নয়। এটি সাউথ এশিয়ান রিজিয়নকে কেন্দ্র করে ডেভেলপ করা একটি ইন্টেলিজেন্ট কো-পাইলট ও টাস্ক এক্সিকিউশন প্ল্যাটফর্ম। নেটিভ বাংলা এবং বাংলিশ কনটেক্সট বুঝে ব্যাকগ্রাউন্ডে স্বয়ংক্রিয় **JARVIS আর্কিটেকচারাল ইঞ্জিন** দিয়ে জটিল টাস্ক প্ল্যানিং, কোড এক্সিকিউশন ও ডেটা হ্যান্ডলিং সমাধান করে।

---

## ✨ Key Features

- **⚡ JARVIS Multi-Agent Orchestrator**: জটিল ইউজার প্রম্পটকে স্বয়ংক্রিয়ভাবে সাব-টাস্কে ভাগ করে ব্যাকগ্রাউন্ড এজেন্টের মাধ্যমে এক ক্লিকে সমাধান।
- **🇧🇩 Native Bangla & Banglish NLP Understanding**: বাংলা এবং বাংলিশের মিশ্র ভাষা ও আঞ্চলিক বাগধারা বুঝে সঠিক রেজাল্ট জেনারেশন।
- **🌐 Interactive 3D Neural Canvas**: Three.js এবং `@react-three/fiber` চালিত ইন্টারঅ্যাক্টিভ 3D কোর ভিজুয়ালাইজেশন।
- **🔐 Secure Authentication & Multi-platform Downloads**: NextAuth.js এবং PostgreSQL ব্যাকড ট্র্যাকিং (Windows, macOS, Linux ক্লায়েন্ট সাপোর্ট)।
- **🎨 Modern Cyberpunk UI / UX**: Tailwind CSS ও Framer Motion দিয়ে তৈরি রেসপনসিভ ডার্ক-থিমযুক্ত ইন্টারফেস ও মাইক্রো-ইন্টারঅ্যাকশন।
- **🛡️ Resilient Database Fallbacks**: সার্ভারলেস ও Vercel ডিপ্লয়মেন্টে ডেটাবেস ল্যাটেন্সি ও ডাউনটাইম প্রিভেনশন।

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Actions) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) |
| **3D Rendering** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** বা **pnpm** বা **yarn**
- **PostgreSQL** ইনস্ট্যান্স (Local, Supabase, বা Neon)

### 1. Clone the Repository

```bash
git clone https://github.com/mhkh361/Obhin-web.git
cd Obhin-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

একটি `.env` ফাইল তৈরি করুন রুট ডিরেক্টরিতে:

```bash
cp .env.example .env
```

আপনার `.env` ফাইলে প্রয়োজনীয় ক্রেডেনশিয়াল দিন:

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/obhin_db?sslmode=prefer"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-production-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional OAuth (Google)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 4. Database Migration

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

ব্রাউজারে ওপেন করুন: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```text
obhin-web/
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── api/              # Auth, download tracking, background APIs
│   ├── layout.tsx        # Global layout & metadata
│   └── page.tsx          # Main landing page
├── components/           # Reusable UI Components
│   ├── auth/             # Login, Register, Modal providers
│   ├── canvas/           # 3D Three.js neural core visualization
│   └── sections/         # Hero, Features (Bento Grid), Navbar, Footer
├── lib/                  # Database clients (Prisma), utility helpers
├── prisma/               # Database schema definition
├── public/               # Static assets & logos
├── styles/               # Global CSS & Tailwind configs
└── package.json          # Project dependencies & scripts
```

---

## 🚢 Deployment (Vercel)

1. প্রজেক্টটি GitHub-এ পুশ করুন।
2. [Vercel](https://vercel.com/) এ গিয়ে **New Project** হিসেবে `Obhin-web` সিলেক্ট করুন।
3. **Environment Variables** সেকশনে `DATABASE_URL`, `NEXTAUTH_SECRET`, এবং `NEXTAUTH_URL` যুক্ত করুন।
4. **Deploy** বাটনে ক্লিক করুন।

---

## 🤝 Contributing

কন্ট্রিবিউশন সবসময় ওয়েলকাম! 

1. রিপোজিটরিটি Fork করুন
2. নতুন ফিচার ব্রাঞ্চ বানান (`git checkout -b feature/AmazingFeature`)
3. পরিবর্তন কমিট করুন (`git commit -m 'feat: Add some AmazingFeature'`)
4. পুশ করুন (`git push origin feature/AmazingFeature`)
5. একটি Pull Request ওপেন করুন

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Developed & Deployed with ❤️ by <b>Team OBHIN</b>
</div>

