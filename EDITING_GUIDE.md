# Guide: How to Customize Your Portfolio

This guide helps you customize all the personal details in your portfolio. Since the project is configured to run database-free (Option B), all your data is stored locally in the source code files.

---

## 1. Edit Your Projects, Certificates & Tech Stack

All list items are stored in a single clean data file:
* **File Location**: [`src/lib/portfolioData.ts`](file:///a:/Projects/Portfolio/portofoliov1/src/lib/portfolioData.ts)

Open this file and modify the arrays:
* **`localProjects`**: Add/edit titles, descriptions, live demo links, GitHub links, technologies used, key features, and background image URLs.
* **`localCertificates`**: Add/edit your certifications and credential image URLs.
* **`localTechStack`**: Add/edit your tech logos and skills. You can use standard URL paths or Devicon URLs like `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`.

---

## 2. Edit Profile Text, Titles & Bio

* **Hero Section (Landing page)**:
  * **File Location**: [`src/components/sections/Hero.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/sections/Hero.tsx)
  * Edit the typed titles on line 165 (e.g., `"Junior Programmer", "Fresh Graduate"`).
  * Edit the introductory paragraph on line 200.
  * Edit the quick skills tags on line 8.

* **About Me Section**:
  * **File Location**: [`src/components/sections/About.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/sections/About.tsx)
  * Edit your name headings on line 175.
  * Edit your bio/description paragraph on line 201.
  * Edit your personal quote on line 232.
  * Edit your **Resume / CV Download link** in the `href` on line 248.

---

## 3. Edit Social Links & Contact Form

* **Social Profiles (GitHub, LinkedIn, Instagram, YouTube, TikTok)**:
  * **File Location**: [`src/components/sections/contact/ContactForm.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/sections/contact/ContactForm.tsx)
  * Edit the LinkedIn link `href` on line 187.
  * Edit the other social links inside the `socialLinks` array on lines 42-67.

* **Copyright Footer**:
  * **File Location**: [`src/components/sections/contact/ContactSection.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/sections/contact/ContactSection.tsx)
  * Edit the copyright year and name on line 92.

---

## 4. Edit Personal Branding (Logo / Domain name)

* **Navbar Logo**:
  * **File Location**: [`src/components/ui/Navbar.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/ui/Navbar.tsx)
  * Change the branding text on line 167 (currently `rifqi.dev`).

* **Welcome Screen Loading Text**:
  * **File Location**: [`src/components/WelcomeScreen.tsx`](file:///a:/Projects/Portfolio/portofoliov1/src/components/WelcomeScreen.tsx)
  * Change the domain display text on line 202 (currently `www.rifqi.vercel.app`).

* **Profile Picture Image**:
  * Replace the image file located at `/public/assets/PP.png` with your own profile photo (ensure it is named `PP.png`).

---

## How to Run & Deploy

1. **Run Locally**:
   ```bash
   npm run dev
   ```
2. **Build and Test**:
   ```bash
   npm run build
   ```
3. **Deploy to Vercel**:
   - Push your changes to your Git repository.
   - Go to [vercel.com](https://vercel.com) and import your repository.
   - No environment variables are required since the app now runs database-free using local files!
