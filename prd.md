# Product Requirements Document (PRD)

## 1. Project Overview
* **Product Name:** Obhin AI Workspace / Web Platform
* **Live Deployment:** `https://obhin-web.vercel.app`
* **Version:** 1.0.0
* **Date:** October 11, 2026
* **Target Platforms:** Web (Desktop, Android, iOS Safari/Chrome), Social WebView (WhatsApp, Telegram)

---

## 2. Problem Statement & Objectives
1. **Aggressive Mobile & In-App Caching:** মোবাইল ব্রাউজার এবং হোয়াটসঅ্যাপ ওয়েবভিউতে টিম মেম্বারদের পরিবর্তিত ছবি তাৎক্ষণিকভাবে আপডেট হচ্ছে না; পুরোনো অ্যাসেট ক্যাশ থেকে লোড হচ্ছে।
2. **Open-Source Attribution & Skill Credits:** প্রজেক্টে ব্যবহৃত থার্ড-পার্টি ওপেন-সোর্স লাইব্রেরি, গিটহাব রেপো এবং স্কিলের যথাযথ ক্রেডিট প্রদর্শন ও অ্যাডমিন লেভেল থেকে নিয়ন্ত্রণ করার কোনো ডায়নামিক মেকানিজম নেই।
3. **SEO & Search Console Integration:** সাইটটি গুগল সার্চ কনসোলে ইনডেক্সিং এবং ওনারশিপ যাচাইকরণ সম্পন্ন করা।

---

## 3. Core Features & Functional Requirements

### 3.1 Static Asset Cache Busting Engine
* **Objective:** কোড পুশ করার পর যেকোনো ক্লায়েন্ট ডিভাইসে (বিশেষ করে মোবাইল ব্রাউজার ও হোয়াটসঅ্যাপ প্রিভিউ) নতুন ইমেজ ও অ্যাসেটের তাৎক্ষণিক রেন্ডারিং নিশ্চিত করা।
* **Requirements:**
  * একটি কেন্দ্রীভূত হেল্পার ফাংশন (`lib/assetUrl.ts` / `src/utils/assetUrl.js`) যা প্রতিটি স্ট্যাটিক মিডিয়া পাথের সাথে ইউনিক ভার্সন কুয়েরি স্ট্রিং (`?v=<hash|timestamp>`) অ্যাপেন্ড করবে।
  * `TeamSection` সহ সকল প্রোফাইল ইমেজ কম্পোনেন্টে সরাসরি স্ট্যাটিক পাথ পরিহার করে ডাইনামিক ক্যাশ-বাস্টিং ইউটিলিটি ব্যবহার করতে হবে।

### 3.2 Dynamic Open-Source & Skill Credits Manager
* **Objective:** বাইরের কনট্রিবিউশন, গিটহাব রেপো এবং স্কিল অ্যাট্রিবিউশন অ্যাডমিন প্যানেল থেকে ইনপুট দেওয়া এবং স্বয়ংক্রিয়ভাবে হোমপেজে দেখানো।
* **Requirements:**
  * **Data Model (Schema):**
    ```typescript
    interface CreditAttribution {
      id: string;
      title: string;        // e.g., "Lucide Icons"
      author: string;       // e.g., "Lucide Team"
      sourceType: "github" | "website" | "doc";
      url: string;          // Direct URL to the source
      description: string;  // Short note on usage
    }
    ```
  * **Admin Controller:** অ্যাডমিন প্যানেল থেকে ফর্মের মাধ্যমে নতুন ক্রেডিট যুক্ত করা, এডিট করা ও রিমুভ করার ব্যবস্থা।
  * **Persistence:** ক্লায়েন্ট-সাইড পারসিস্টেন্স (`localStorage`) এবং ব্যাকএন্ড স্টোরেজ সিঙ্ক (`/api/credits`).
  * **Homepage Display:** হোমপেজের ফুটার সেকশনের ঠিক উপরে রেসপনসিভ গ্রিড কার্ড লেআউটে সমস্ত ওপেন-সোর্স ক্রেডিট শো করা (`CreditsSection`).

### 3.3 SEO Verification & Search Engine Indexing
* **Objective:** গুগলে সাইট ইনডেক্সিং এবং ডোমেইনের মালিকানা সক্রিয় রাখা।
* **Requirements:**
  * গুগলের ভেরিফিকেশন ফাইল `public/google873c8bb4fe30f1f3.html` স্থায়ীভাবে প্রজেক্টে সংরক্ষণ করা।
  * এসইও ক্রলারদের জন্য `public/robots.txt` এবং `public/sitemap.xml` কনফিগারেশন বজায় রাখা।

---

## 4. Technical Architecture & File Structure

```text
├── public/
│   ├── google873c8bb4fe30f1f3.html   # Google Search Console Verification File
│   ├── robots.txt                    # Search Engine Crawler Directives
│   └── sitemap.xml                   # SEO XML Sitemap
├── src/
│   ├── components/
│   │   ├── TeamSection.jsx           # Team Showcase with Cache Busting
│   │   └── CreditsSection.jsx        # Admin & Client Credit Attribution UI
│   └── utils/
│       └── assetUrl.js               # Dynamic Asset Versioning & Cache Buster
├── prd.md                            # Product Requirements Document
└── package.json
```

