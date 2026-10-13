# Wiiz Dev — site d'agence et back-office

Site d'une agence de services numériques, avec un back-office pour gérer son contenu sans toucher au code : projets, technologies affichées, réglages du site et messages reçus par le formulaire de contact.

## Ce qu'il contient

**Site public** : accueil, à propos, projets, technologies, contact.

**Back-office** (`/admin`, connexion requise) :
- Projets : création, modification, suppression
- Technologies : gestion de la liste et de sa visibilité sur le site
- Messages : lecture, statut, réponse par e-mail
- Réglages du site

## Stack

- **Front-end** (`wiiz/`) : React · TypeScript · Vite · Tailwind CSS · React Router · TanStack Query · React Hook Form · Yup · Framer Motion · Three.js
- **Back-end** (`backend/`) : Node.js · Express · TypeScript · MongoDB (Mongoose) · JWT · bcrypt · Nodemailer · Multer · Helmet

## Lancer en local

```bash
npm run install:all   # installe la racine, le back-end et le front-end
npm run dev           # lance le back-end (port 5000) et le front-end ensemble
```

Variables d'environnement du back-end (`backend/.env`) :

```bash
MONGODB_URI=
JWT_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
FROM_EMAIL=
PORT=5000
SEED_ADMIN_PASSWORD=          # utilisé par npm run setup et npm run seed
SEED_SUPER_ADMIN_PASSWORD=    # utilisé par npm run seed
```

## API

| Ressource | Lecture publique | Écriture (admin) |
|---|---|---|
| `/api/projects` | GET | POST, PUT, DELETE |
| `/api/techstack` | GET | POST, PUT, DELETE |
| `/api/settings` | GET | PUT |
| `/api/emails` | POST (formulaire de contact) | GET, PUT, DELETE, réponse |
| `/api/auth` | POST `/login` | POST `/admin` |

---

Réalisé par **Ishak Korichi** · [korichi-ishak.vercel.app](https://korichi-ishak.vercel.app)
