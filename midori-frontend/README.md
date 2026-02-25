## Project info
Ecommerce Midori frontend, developed with **React 19 + TypeScript + Vite**. Consumes a REST API built with Laravel 12 + Passport.
**URL**: https://github.com/Inbi-Nav/Midori-Back

This project is part of a practice focused on frontend development using AI assistance, documenting the complete process of:

### Frontend
- **Framework:** React 19
- **Language:** TypeScript 5.9
- **Bundler:** Vite 7
- **State Management:** Zustand + Redux Toolkit
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Forms:** React Hook Form + Yup
- **Animations:** Framer Motion
- **Styling:** CSS Modules + Glassmorphism
- **Icons:** React Icons + Heroicons
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
User roles
###  Client 
**Responsibilities:**
- Browse products with filters 
- View product details in a modal
- Add products to cart with stock validation
- Manage cart 
- Create Orders
- View order history
- Cancel pending orders
- Request to become a provider
- Edit profile

### Provider 

**How to become a provider:**
1. Login as a cleint
2. Go to the sidebar and click the "Provider Request" icon
3. Admin receives notification and approves the request
4. User role changes from client to provider

**Responsibilities:**
- Manage their own products
- View received orders
- Update order status (processing → shipped → delivered)
- View product categories

### Admin
**Responsibilities:**
- View dashboard with statistics 
- Manage all users (view, update roles)
- Oversee all products in the system
- Track all orders with status
- Approve or decline provider requests
**Flujo de navegación:**

##  Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@midori.com | midori2026 |
| **Client** | Sara@gmail.com | Sara1234 |
| **Provider** | inbi@midori.com | 12345678 |