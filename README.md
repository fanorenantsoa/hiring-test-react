# Exercice Technique React - Fnac Darty

Application React + TypeScript + Vite pour afficher une liste de fonctionnalités avec navigation par menu et support du thème clair/sombre.

## 📋 Prérequis

- **Node.js** : version 18 ou supérieure
- **npm** : version 9 ou supérieure (ou équivalent comme `yarn` ou `pnpm`)

Pour vérifier vos versions installées :

```bash
node --version
npm --version
```

## 🚀 Installation

1. **Cloner le dépôt** (si applicable) ou naviguer dans le dossier du projet

2. **Installer les dépendances** :

```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires listées dans `package.json`.

## 💻 Lancement de l'application

### Mode développement

Pour lancer l'application en mode développement avec Hot Module Replacement (HMR) :

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si 5173 est occupé).

### Build de production

Pour créer une version optimisée de production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualisation du build

Pour prévisualiser le build de production localement :

```bash
npm run preview
```

## 🧪 Tests

### Exécuter les tests

Pour exécuter tous les tests une fois :

```bash
npm test
```

### Interface utilisateur des tests

Pour ouvrir l'interface utilisateur de Vitest (mode watch) :

```bash
npm run test:ui
```

### Couverture de code

Pour générer un rapport de couverture de code :

```bash
npm run test:coverage
```

Le rapport sera disponible dans le dossier `coverage/`. Ouvrez `coverage/index.html` dans votre navigateur pour visualiser le rapport détaillé.

## 🔍 Linting et Formatage

### Vérifier le code avec ESLint

Pour vérifier le code sans correction automatique :

```bash
npm run lint:check
```

### Corriger automatiquement les erreurs ESLint

Pour corriger automatiquement les erreurs ESLint :

```bash
npm run lint
```

### Vérifier le formatage avec Prettier

Pour vérifier le formatage du code :

```bash
npm run format:check
```

### Formater le code avec Prettier

Pour formater automatiquement tout le code :

```bash
npm run format
```

## 📁 Structure du projet

```
exercice-tech-react-fnac-darty/
├── api/                    # Données JSON de l'application
│   └── data.json
├── public/                 # Fichiers statiques publics
├── src/
│   ├── __tests__/         # Tests d'intégration
│   ├── assets/            # Assets (images, etc.)
│   ├── components/        # Composants React réutilisables
│   │   ├── content/       # Composant de contenu
│   │   ├── header/        # En-tête principal
│   │   ├── layout/        # Composant de mise en page
│   │   ├── menu/          # Menu de navigation
│   │   └── menuItem/      # Élément de menu
│   ├── contexts/          # Contextes React (AppContext)
│   ├── features/          # Features de l'application
│   │   └── page/          # Page principale
│   ├── test/              # Configuration des tests
│   ├── types/             # Définitions TypeScript
│   ├── App.tsx            # Composant racine
│   ├── App.css            # Styles globaux de l'application
│   ├── index.css          # Styles CSS globaux
│   └── main.tsx           # Point d'entrée de l'application
├── coverage/              # Rapports de couverture de code
├── eslint.config.js       # Configuration ESLint
├── package.json           # Dépendances et scripts npm
├── tsconfig.json          # Configuration TypeScript
├── tsconfig.app.json      # Configuration TypeScript pour l'app
├── tsconfig.node.json     # Configuration TypeScript pour Node
└── vite.config.ts         # Configuration Vite
```

## 🛠️ Technologies utilisées

- **React 19** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Vite** : Build tool et serveur de développement
- **Vitest** : Framework de tests
- **Testing Library** : Utilitaires de test React
- **ESLint** : Linter JavaScript/TypeScript
- **Prettier** : Formateur de code
- **Husky** : Git hooks
- **CSS Modules** : Styles modulaires

## 📝 Scripts disponibles

| Commande                | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Lance le serveur de développement          |
| `npm run build`         | Crée un build de production                |
| `npm run preview`       | Prévisualise le build de production        |
| `npm test`              | Exécute les tests une fois                 |
| `npm run test:ui`       | Ouvre l'interface utilisateur de Vitest    |
| `npm run test:coverage` | Génère un rapport de couverture            |
| `npm run lint`          | Corrige automatiquement les erreurs ESLint |
| `npm run lint:check`    | Vérifie le code avec ESLint                |
| `npm run format`        | Formate le code avec Prettier              |
| `npm run format:check`  | Vérifie le formatage avec Prettier         |

## 🎨 Fonctionnalités

- ✅ Affichage d'une liste de fonctionnalités
- ✅ Navigation par menu
- ✅ Thème clair/sombre avec persistance dans le localStorage
- ✅ Tests unitaires et d'intégration
- ✅ Configuration ESLint et Prettier
- ✅ Git hooks avec Husky

## 📚 Documentation supplémentaire

### Configuration ESLint

Pour étendre la configuration ESLint avec des règles type-aware, consultez la section "Expanding the ESLint configuration" ci-dessous.

### React Compiler

Le React Compiler n'est pas activé par défaut dans ce template en raison de son impact sur les performances de développement et de build. Pour l'ajouter, consultez la [documentation officielle](https://react.dev/learn/react-compiler/installation).

## 🔧 Configuration ESLint avancée

Si vous développez une application de production, nous recommandons de mettre à jour la configuration pour activer les règles type-aware :

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

Vous pouvez également installer [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) et [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) pour des règles spécifiques à React :

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
