# hydrolink-BTP Website

Site web professionnel pour hydrolink-BTP, entreprise multidisciplinaire basée à Niamey, Niger, spécialisée en génie civil & BTP, hydraulique, e-commerce et commerce général.

## 🚀 Fonctionnalités

- **Site web responsive** avec design moderne et professionnel
- **Internationalisation** (Français par défaut, Anglais prévu)
- **Formulaires de contact et devis** avec validation complète
- **Navigation intuitive** avec méga-menu
- **SEO optimisé** avec métadonnées structurées
- **Accessibilité WCAG AA** respectée
- **Performance optimisée** (Lighthouse ≥ 90)
- **Design system cohérent** avec palette personnalisée

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : Tailwind CSS + Radix UI
- **Formulaires** : React Hook Form + Zod validation
- **Internationalisation** : next-intl
- **SEO** : next-seo
- **Animations** : CSS transitions avec respect du `prefers-reduced-motion`
- **Tests** : Playwright (E2E) + Vitest/RTL (composants)

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone [repository-url]
cd hydrolink-btp

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

## 🌍 Développement local

Le serveur de développement démarre sur `http://localhost:3000`

### Scripts disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement

# Production
npm run build        # Construit l'application pour la production
npm run start        # Lance l'application en production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les problèmes ESLint

# Tests
npm run test         # Lance les tests Vitest
npm run test:ui      # Lance les tests avec interface graphique
npm run test:run     # Lance les tests en mode CI
npm run e2e          # Lance les tests E2E avec Playwright
npm run e2e:ui       # Lance les tests E2E avec interface graphique
```

## 📁 Structure du projet

```
hydrolink-btp/
├── app/                    # Pages Next.js (App Router)
│   ├── a-propos/          # Page À propos
│   ├── contact/           # Page contact avec formulaires
│   ├── impact/            # Page impact social
│   ├── objectifs/         # Page objectifs
│   ├── pourquoi-nous-choisir/ # Page différenciation
│   ├── services/          # Pages des services
│   │   ├── btp/          # Génie civil & BTP
│   │   ├── hydraulique/  # Hydraulique
│   │   ├── e-commerce/   # E-commerce
│   │   └── commerce-general/ # Commerce général
│   ├── mentions-legales/  # Mentions légales
│   ├── politique-de-confidentialite/ # Politique de confidentialité
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout racine
│   └── page.tsx          # Page d'accueil
├── components/           # Composants réutilisables
│   └── ui/              # Composants UI (shadcn/ui)
├── content/             # Fichiers de traduction
│   ├── site.fr.json    # Contenu en français
│   └── site.en.json    # Contenu en anglais
├── lib/                # Utilitaires et configurations
│   ├── i18n.ts        # Configuration i18n
│   ├── utils.ts       # Utilitaires divers
│   └── validations.ts # Schémas de validation
├── public/             # Assets statiques
└── [config files]      # Fichiers de configuration
```

## 🎨 Design System

### Palette de couleurs

- **Primaire** : Bleu (#2563eb) - Représente la confiance et le professionnalisme
- **Accent** : Vert (#16a34a) - Symbolise l'eau et le développement durable
- **Neutres** : Tons chauds de gris pour l'élégance et la lisibilité

### Typographie

- **Police principale** : Inter (sans-serif moderne)
- **Police secondaire** : JetBrains Mono (pour le code/technique)

### Composants

- **Header** : Navigation sticky avec méga-menu
- **Footer** : Informations de contact et liens légaux
- **Cards** : Services et témoignages avec effets hover
- **Formulaires** : Validation en temps réel avec messages d'erreur

## 📝 Contenu

Le contenu est géré via des fichiers JSON de traduction :

- **Français** (`content/site.fr.json`) - Langue par défaut
- **Anglais** (`content/site.en.json`) - Traduction anglaise

### Structure du contenu

```json
{
  "brand": {
    "name": "hydrolink-BTP",
    "location": "Niamey, Niger",
    "phones": ["+227 91 27 09 51", "+227 88 59 59 20"],
    "email": "hydrolinkbtp@gmail.com"
  },
  "nav": [...],
  "homepage": {...},
  "services": {...},
  "contact": {...}
}
```

## 🔧 Configuration

### Next.js

- **App Router** activé
- **TypeScript** configuré
- **Images** optimisées avec next/image
- **Internationalisation** avec next-intl

### SEO

- Métadonnées structurées (Open Graph, Twitter Cards)
- Sitemap automatique
- Schema.org (Organization, LocalBusiness)
- Balises meta optimisées

### Accessibilité

- Contraste WCAG AA respecté
- Navigation au clavier complète
- Screen reader friendly
- Respect de `prefers-reduced-motion`

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement (si nécessaire)
3. Déployez automatiquement sur chaque push

### Autres plateformes

L'application peut être déployée sur toute plateforme supportant Node.js :

```bash
# Construire l'application
npm run build

# Lancer en production
npm start
```

### Variables d'environnement

Aucune variable d'environnement n'est requise pour le fonctionnement de base.

## 🧪 Tests

### Tests unitaires

```bash
# Lancer tous les tests
npm run test

# Tests avec interface graphique
npm run test:ui

# Coverage
npm run test:run -- --coverage
```

### Tests E2E

```bash
# Lancer les tests E2E
npm run e2e

# Tests E2E avec interface graphique
npm run e2e:ui
```

## 📊 Performance

- **Lighthouse Score** : ≥ 90 (Performance, SEO, Accessibilité, Best Practices)
- **Images optimisées** avec next/image
- **Code splitting** automatique
- **CSS optimisé** avec PostCSS
- **Animations légères** avec respect du mouvement réduit

## 🌐 Internationalisation

Le site supporte actuellement le français et peut être facilement étendu à d'autres langues en ajoutant de nouveaux fichiers de traduction dans le dossier `content/`.

## 📞 Support

Pour toute question ou support :

- **Email** : hydrolinkbtp@gmail.com
- **Téléphone** : +227 91 27 09 51 / +227 88 59 59 20
- **Adresse** : Niamey, Niger

## 📄 Licence

Ce projet est développé pour hydrolink-BTP. Tous droits réservés.

---

**hydrolink-BTP** - Des solutions durables et de qualité, adaptées au Niger.
