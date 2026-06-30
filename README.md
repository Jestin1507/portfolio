# Jestin Thomas — Portfolio

Live portfolio site for Jestin Thomas, AI/ML Engineer & Data Scientist.

## 📁 Structure
```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/  (profile.png, christ_university.png, mg_university.png)
│   └── resume/  → ⚠️ ADD JestinThomas_Resume.pdf HERE (optional — nav already links to Google Drive)
└── README.md
```

## ✅ What's fixed in this build
- Profile picture now shows in Hero (orbit) and About section
- Both work experiences included: TechZia + Seeroo IT Solutions (updated bullets)
- All 5 projects with consistent card design — Zomato & LLMOps as full-width featured cards with Live Demo buttons
- Research section: IEEE and Patent now have a clean top bar (source label + date), no more misaligned headings
- Contact form wired to Formspree (`xqeoqllp`) — messages land directly in your Gmail

## 🚀 Deploy
```bash
cd portfolio
git init
git add .
git commit -m "Final portfolio update"
git branch -M main
git remote add origin https://github.com/Jestin1507/portfolio.git
git push -u origin main --force
```
Then: GitHub repo → Settings → Pages → Branch: main → Save.
Live at: `https://jestin1507.github.io/portfolio/`

## 🔗 Key Links
- IEEE: ieeexplore.ieee.org/abstract/document/11470543
- Patent: Google Drive (linked in Research section)
- Resume: Google Drive (linked in Nav, Hero, Contact)
- Zomato Live Demo: streamlit.app
- LLMOps Live Demo: streamlit.app
