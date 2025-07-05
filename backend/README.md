# WiizDev Backend API

Backend Express.js avec MongoDB pour l'API WiizDev.

## 🚀 Déploiement sur Render

### Prérequis
- Compte GitHub avec le repo connecté
- Compte Render.com
- MongoDB Atlas configuré

### Étapes de déploiement

#### 1. Connecter le repository GitHub
1. Allez sur [render.com](https://render.com)
2. Cliquez sur "New" → "Web Service"
3. Connectez votre repository GitHub
4. Sélectionnez le repo `wiizdev`

#### 2. Configuration du service
- **Name**: `wiizdev-api`
- **Environment**: `Node`
- **Region**: Choisissez la plus proche
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

#### 3. Variables d'environnement
Ajoutez ces variables dans Render :

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=votre-secret-jwt-tres-securise-ici
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://wiizdev.com,https://www.wiizdev.com
```

#### 4. Déployer
1. Cliquez sur "Create Web Service"
2. Attendez que le build se termine
3. Votre API sera disponible sur : `https://wiizdev-api.onrender.com`

### 🌐 Configuration du domaine personnalisé

#### 1. Dans Render
1. Allez dans les paramètres de votre service
2. Section "Custom Domains"
3. Ajoutez : `api.wiizdev.com`

#### 2. Dans OrangeHost (panneau de contrôle)
1. Créez un sous-domaine : `api.wiizdev.com`
2. Configurez un **CNAME** pointant vers :
   ```
   wiizdev-api.onrender.com
   ```
3. Activez SSL pour le sous-domaine

#### 3. Vérification
- Testez : `https://api.wiizdev.com/api/health`
- Devrait retourner : `{"status":"OK","message":"WiizDev API is running"}`

### 📋 Endpoints disponibles

- `GET /` - Page d'accueil API
- `GET /api/health` - Health check
- `POST /api/auth/login` - Connexion admin
- `GET /api/projects` - Liste des projets
- `GET /api/techstack` - Liste des technologies
- `POST /api/emails` - Envoi d'email
- `GET /api/settings` - Paramètres

### 🔧 Développement local

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start
```

### 📝 Variables d'environnement locales

Créez un fichier `.env` basé sur `.env.example` :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=votre-secret-local
NODE_ENV=development
```

### 🛠️ Structure du projet

```
backend/
├── server.js          # Point d'entrée principal
├── package.json       # Dépendances et scripts
├── render.yaml        # Configuration Render
├── Procfile          # Configuration Procfile
├── .env.example      # Template variables d'environnement
├── src/              # Code source TypeScript
│   ├── routes/       # Routes API
│   ├── controllers/  # Contrôleurs
│   ├── models/       # Modèles MongoDB
│   └── middleware/   # Middlewares
└── dist/             # Code compilé JavaScript
```

### ✅ Vérification du déploiement

1. **Health Check** : `https://api.wiizdev.com/api/health`
2. **Page d'accueil** : `https://api.wiizdev.com/`
3. **CORS** : Vérifiez que le frontend peut appeler l'API
4. **MongoDB** : Vérifiez la connexion dans les logs Render

### 🔍 Logs et monitoring

- **Logs Render** : Dashboard Render → Service → Logs
- **Métriques** : Dashboard Render → Service → Metrics
- **Health checks** : Automatiques via `/api/health`

### 🚨 Troubleshooting

**Problème** : Build échoue
- **Solution** : Vérifiez que `npm run build` fonctionne localement

**Problème** : MongoDB ne se connecte pas
- **Solution** : Vérifiez `MONGODB_URI` dans les variables d'environnement

**Problème** : CORS errors
- **Solution** : Vérifiez `ALLOWED_ORIGINS` dans les variables d'environnement

**Problème** : Domaine ne fonctionne pas
- **Solution** : Vérifiez la configuration CNAME dans OrangeHost 