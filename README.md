# TrashTech / WasteWise

An interactive prototype for **Community Service for Planetary Health — Tutorial 7, Group 3**.

TrashTech is a low-data, Bahasa Melayu-friendly waste reporting and recycling rewards concept for residents of Desa Mentari. The demo follows the planned flow:

**QR entry → report waste → learn to sort → earn recycling rewards**

## Included in this prototype

- Resident waste-report form with category, location, notes and optional photo selection
- English / Bahasa Melayu language toggle
- Five-card sorting guide for common household materials
- Simulated points balance and voucher redemption
- Community leader queue showing report status
- Responsive layout for desktop and mobile screens

## Run locally

Prerequisite: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by the development server. To create a production build, run:

```bash
npm run build
```

## Repository contents

- `app/` — the WasteWise interface and interactions
- `public/desa-mentari-hero.png` — the hero image used by the landing page
- `package.json` and `package-lock.json` — project dependencies and reproducible installs
- `scripts/` — build, preview and artifact-validation helpers
- `.openai/hosting.json` — hosting configuration for the existing deployment

## Important demo note

This is a front-end prototype. Reports, points and voucher changes are stored only in the current browser session and reset after a refresh. The project does not yet connect to a real WhatsApp/Telegram chatbot, database, payment system or recycling partner.

The pilot context represented in the interface is Desa Mentari Block 8, with the community hall and supervised ground-floor collection point as supporting locations. The displayed dashboard figures are explicitly simulated presentation data.
