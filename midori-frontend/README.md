## Project info
Ecommerce Midori frontend, developed with **React 19 + TypeScript + Vite**. Consumes a REST API built with Laravel 12 + Passport.
**URL**: https://github.com/Inbi-Nav/Midori-Back

This project is part of a practice focused on frontend development using AI assistance, documenting the complete process of:


## Library
- Framework | React 19 |
- Lenguaje | TypeScript 5.9 |
- Bundler | Vite 7 |
- Routing | React Router DOM 7 |
- Estado global | Redux Toolkit + Zustand |
- Peticiones HTTP | Axios |
- Formularios | React Hook Form + Yup |
- Animaciones | Framer Motion |
- Notificaciones | React Hot Toast |
- Iconos | Heroicons, React Icons |
- Autenticación | Cookies (js-cookie) + Laravel Passport (backend) 
---
## Estructura del proyecto
```
midori-frontend/
├── public/              
├── src/
│   ├── api/             # API services and REST calls
│   ├── assets/          # Images and resources
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Main Views
│   ├── routes/          # Routes configuration & routes protection
│   ├── store/           # Global State
│   ├── styles/          # Global & components CSS styles
│   ├── utils/           # Utilities and helpers
│   ├── App.tsx          # Root Component
│   └── main.tsx         
├── .env                 # Enviroment variables 
├── package.json
├── vite.config.ts
└── tsconfig.json
```
---

##  Requirement

Follow these steps:
- Backend **Midori-Back** corriendo en local o en un servidor accesible
```sh
git clone <URL_FRONT>
---
cd <YOUR_PROJECT_NAME>

git clone https://github.com/Inbi-Nav/Midori-Front.git

cd Midori-Front/midori-frontend

cp .env.example .env

npm install

npm run dev
```
