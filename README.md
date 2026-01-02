# NoEscape - Alarme React Native Brutale

Une application d'alarme incontournable avec design brutaliste + neumorphiste, service background persistant, et challenges de désactivation.

## 🎯 Vision

Une app d'alarme impossible à fermer, avec un design agressif et des interactions brutales. L'utilisateur doit résoudre un challenge (math ou marche) pour éteindre l'alarme, qui s'intensifie progressivement.

## 🏗️ Architecture

- **Monorepo pnpm** avec structure professionnelle
- **Plateforme** : Android + iOS
- **Version** : React Native 0.73+ avec TypeScript

### Structure

```
noescape/
├── apps/
│   └── noescape/           # Application React Native principale
│       ├── src/
│       │   ├── screens/    # Écrans (Home, AlarmCreate, AlarmEdit, AlarmRing)
│       │   ├── services/   # Services (AlarmService)
│       │   ├── hooks/      # Hooks personnalisés
│       │   ├── navigation/ # Navigation
│       │   └── components/ # Composants spécifiques (AdBanner)
│       ├── android/        # Configuration Android
│       └── ios/            # Configuration iOS
├── packages/
│   └── shared/             # Code partagé
│       ├── src/
│       │   ├── components/ # Composants réutilisables
│       │   ├── hooks/      # Hooks réutilisables
│       │   ├── utils/      # Utilitaires
│       │   ├── constants/  # Constantes (couleurs, styles)
│       │   └── types/      # Types TypeScript
└── pnpm-workspace.yaml
```

## 🎨 Design System

### Palette de couleurs

- **Fond principal**: `#0F0F0F` (noir brutaliste)
- **Fond secondaire**: `#1A1A1A` (gris-noir neumorphe)
- **Blanc/Accents**: `#FFFFFF` et `#E8E8E8`
- **Accent alarme**: `#FF1744` (rouge agressif)
- **Accent succès**: `#00FF41` (vert néon)

### Style UI

- Typographie: Sans-serif épais et boxy
- Géométries: Carrés, rectangles (border-radius minimal)
- Ombre neumorphe: Soft shadows gris sur fond foncé
- Boutons: Apparence "enfoncée" dans l'interface

## ✨ Fonctionnalités

### 1. Écran Principal
- Liste des alarmes avec statut actif/inactif
- Bouton FAB brutaliste pour ajouter
- Gestion: activer/désactiver, supprimer, modifier
- Animations au scroll

### 2. Création/Modification d'Alarme
- Sélecteur d'heure épuré
- Étiquette optionnelle
- Récurrence: Une fois, quotidien, jours personnalisés
- **Choix du challenge**: Math 🔢 ou Marche 👣

### 3. Écran d'Alarme (Déclenchement)
- Plein écran, impossible à fermer
- **Volume progressif**: Commence à 30%, augmente de 5% toutes les 10s
- **Challenge Math**: Résoudre une opération (nombres 1-50)
- **Challenge Marche**: Détecteur de pas avec accéléromètre (10-30 pas)
- Feedback visuel et vibration

### 4. Service Background
- **Android**: Foreground Service avec notification permanente
- **iOS**: Background Tasks avec permissions location
- Relancement automatique après boot
- Vérification périodique des alarmes

### 5. Publicités
- Intégration AdMob
- Bannières en bas de l'écran
- Consentement RGPD intégré

## 🚀 Installation

**Prérequis**: Node.js 18+ et pnpm 8+

```bash
# Installer pnpm (si pas déjà installé)
npm install -g pnpm

# Installer les dépendances
pnpm install

# Installer les pods iOS (automatique via postinstall)
# Ou manuellement: cd apps/noescape/ios && pod install && cd ../..

# Lancer sur Android
pnpm run dev:android

# Lancer sur iOS
pnpm run dev:ios

# Lint et typecheck
pnpm run lint
pnpm run typecheck
```

## 📦 Dépendances principales

- `react-native` 0.73+
- `@react-navigation/native` - Navigation
- `react-native-reanimated` - Animations
- `zustand` - State management
- `react-native-google-mobile-ads` - AdMob
- `react-native-background-actions` - Background service
- `react-native-sensors` - Accéléromètre
- `react-native-sound` - Son d'alarme
- `@react-native-async-storage/async-storage` - Stockage persistant

## 📱 Composants Réutilisables

- `AlarmCard` - Carte d'une alarme
- `Button` - Bouton brutaliste (primary, secondary, danger, success)
- `TimePicker` - Sélecteur d'heure épuré
- `Switch` - Toggle alarme on/off
- `Input` - Champ texte minimaliste
- `NumberPad` - Clavier numérique personnalisé
- `VolumeIndicator` - Barres de volume animées
- `StepCounter` - Compteur de pas animé

## 🔧 Hooks Réutilisables

- `useAlarms` - Gestion des alarmes
- `useAccelerometer` - Détection de mouvement
- `useBackground` - Service background
- `useAlarmChecker` - Vérification d'alarmes

## 📝 Spécifications Techniques

### Challenge Math
- Génération aléatoire: A + B = ? ou A - B = ?
- Nombres 1-50
- Résultat 1-100
- Validation stricte avec feedback

### Challenge Marche
- Détection accéléromètre
- Seuil configurable (2 par défaut)
- Vibration à chaque pas
- Validation automatique

### Volume Progressif
- Démarre à 30%
- Augmente de 5% toutes les 10 secondes
- Atteint 100% après ~4-5 minutes
- Affichage barres animées

## 🔐 Permissions

### Android
```xml
- INTERNET
- WAKE_LOCK
- RECEIVE_BOOT_COMPLETED
- VIBRATE
- FOREGROUND_SERVICE
- POST_NOTIFICATIONS
- SCHEDULE_EXACT_ALARM
- USE_EXACT_ALARM
```

### iOS
```xml
- Location Always and When In Use
- Motion Usage
- Background Modes: audio, location, fetch, processing
```

## 🧪 Tests & Qualité

- ESLint + Prettier configurés
- TypeScript strict mode
- Architecture modulaire et maintenable

## 📄 License

MIT
