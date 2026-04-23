# Signal Studio — Site vitrine premium

Site vitrine d'un consultant Google Ads spécialisé en tracking server-side, Consent Mode v2 et liaison CRM. Quatre pages, orientation conversion, infrastructure de mesure préparée.

## Stack

- **Next.js 15.5** (App Router, React 19, TypeScript strict)
- **Tailwind CSS 3** (tokens design custom : palette ink/gold, fonts Satoshi + General Sans)
- **Motion** (anciennement Framer Motion) pour toutes les animations
- **react-hook-form + Zod** pour le formulaire avec validation stricte
- **Server Actions** Next.js pour la soumission du formulaire
- Composants UI shadcn-style (Button, Input, Label, Accordion, Textarea)
- Icônes **Lucide**
- Typographie via **Fontshare** (Satoshi, General Sans) + Google Fonts (JetBrains Mono)

## Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Analytics, CMP, Navbar, Footer
│   ├── page.tsx                # Accueil (hero / problème / méthode / preuves / CTA)
│   ├── services/page.tsx       # 3 offres + FAQ technique (7 questions)
│   ├── expertise/page.tsx      # Credentials, schéma sGTM animé, stack, principes
│   └── contact/
│       ├── page.tsx            # Landing du formulaire
│       └── actions.ts          # Server Action avec validation Zod + webhook
├── components/
│   ├── analytics/              # GTM loader + ConsentBanner
│   ├── forms/                  # ContactForm
│   ├── layout/                 # Navbar, Footer
│   ├── motion/                 # Reveal, Stagger, PageTransition
│   ├── sections/               # Sections réutilisables (Hero, Problem, Method, etc.)
│   └── ui/                     # Primitives UI (Button, Input, Accordion, etc.)
└── lib/
    ├── content.ts              # Contenu partagé (nav, site config)
    ├── gtm.ts                  # Helpers Consent Mode v2 + dataLayer
    ├── schemas.ts              # Schémas Zod (formulaire)
    └── utils.ts                # cn() pour Tailwind
```

## Démarrage local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

| Variable | Rôle | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | Identifiant du conteneur GTM web (format `GTM-XXXXXXX`). Si absent, GTM n'est pas chargé. | Production |
| `CONTACT_WEBHOOK_URL` | URL à laquelle les soumissions du formulaire sont POSTées en JSON (Make, Zapier, n8n, Slack, etc.). Si absente, les soumissions sont acceptées mais non transmises. | Production |

## Tracking & conformité — ce qui est déjà branché

### Consent Mode v2 par défaut `denied`

Dans `src/components/analytics/analytics.tsx`, le script `beforeInteractive` pousse la configuration par défaut avant même le chargement de GTM :

```js
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
  // ...
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
```

C'est la configuration recommandée pour préserver la modélisation Google tant que le visiteur n'a pas choisi.

### CMP bannière

`src/components/analytics/consent-banner.tsx` :
- trois boutons : **Tout accepter**, **Tout refuser**, **Personnaliser**
- deux catégories granulaires : Mesure d'audience / Publicité & remarketing
- persistance dans un cookie `gads_consent` versionné, 180 jours
- appel `gtag('consent', 'update', …)` à chaque choix

Pour production, vous pouvez remplacer cette CMP par Didomi / Axeptio / OneTrust — supprimez alors le `<ConsentBanner />` dans `layout.tsx` et branchez le SDK de la CMP choisie. Le `default denied` dans `Analytics` reste nécessaire.

### Événement `generate_lead`

Au submit réussi du formulaire de contact (`src/components/forms/contact-form.tsx`), le code pousse :

```js
dataLayer.push({
  event: 'generate_lead',
  form_name: 'contact',
  topic: data.topic,         // audit | server_side | pilotage | other
  monthly_budget: data.monthlyBudget,
});
```

Dans GTM, configurez un déclencheur `Événement personnalisé = generate_lead` et branchez-y :
- la balise Google Ads Conversion Linker (si pas déjà globale)
- une balise Google Ads Conversion avec la valeur de lead qui vous convient (objectif : enhanced conversions for leads)
- une balise GA4 `generate_lead`

### Formulaire côté serveur

`src/app/contact/actions.ts` — la Server Action :
1. Valide le payload via Zod (`contactSchema`)
2. Rejette les bots via un champ honeypot `website`
3. POST le payload vers `CONTACT_WEBHOOK_URL` en JSON
4. Retourne `{ ok: true }` ou `{ ok: false, fieldErrors }`

Aucune donnée n'est stockée côté application.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run typecheck` | Vérifie les types sans émettre |

## Design system

- **Couleurs** : `ink-*` (navy 50→950) + `gold` (accent premium, usage limité)
- **Fonts** : Satoshi (titres), General Sans (corps), JetBrains Mono (eyebrows, chiffres)
- **Sans border-radius** par défaut sur les composants UI (style éditorial)
- **Animations Motion** uniquement — jamais d'animation CSS brute
- **`prefers-reduced-motion`** respecté partout via `useReducedMotion()`
- Contraste WCAG AA+ sur tous les textes

## Checklist déploiement Vercel

- [ ] Connecter le repo GitHub sur [vercel.com/new](https://vercel.com/new)
- [ ] Framework preset : `Next.js` (auto-détecté)
- [ ] Root directory : `site` (si le repo contient autre chose à la racine)
- [ ] Ajouter les variables d'env dans **Settings → Environment Variables** :
  - `NEXT_PUBLIC_GTM_ID` (Production + Preview)
  - `CONTACT_WEBHOOK_URL` (Production uniquement si vous ne voulez pas que les previews postent)
- [ ] Configurer le domaine custom dans **Settings → Domains**
- [ ] Dans GTM web, créer le conteneur et ses tags :
  - [ ] Balise Google Ads Conversion Linker (toutes pages)
  - [ ] Balise GA4 Configuration (avec `send_page_view = true`)
  - [ ] Déclencheur `generate_lead` (événement personnalisé)
  - [ ] Balises Google Ads Conversion + GA4 Event sur ce déclencheur
- [ ] Créer le conteneur GTM server-side (Cloud Run ou Stape)
- [ ] Mapper le sous-domaine `tag.votre-domaine.fr` vers le conteneur server-side
- [ ] Router les requêtes du GTM web vers le conteneur server-side
- [ ] Activer Enhanced Conversions dans Google Ads (Outils → Mesure → Conversions)
- [ ] Tester le formulaire en preview avec `CONTACT_WEBHOOK_URL` pointant sur un endpoint de test (Webhook.site, requestbin, etc.)
- [ ] Vérifier en prod avec Google Tag Assistant que `consent default denied` est bien poussé avant les tags

## Post-MVP — pistes

- Branchement 21st.dev Magic (MCP) pour enrichir les sections avec des composants pré-designés (hero avec aurora subtile, pricing toggle, testimonial carousel) — nécessite un redémarrage de Claude Code après config.
- Pages `/mentions-legales`, `/politique-confidentialite`, `/politique-cookies` (obligatoires en France).
- Rédaction d'un article de fond sur le Consent Mode v2 pour le SEO long-tail.
- A/B test du hero (variant avec vidéo silencieuse du conteneur sGTM en action).

---

Généré via le skill `construire-site-premium` (UI/UX Pro Max + Motion + 21st.dev Magic).
