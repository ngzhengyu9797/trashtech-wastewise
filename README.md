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

## Live demo

The current hosted demo is available at:

<https://trashtech-wastewise-demo.ngzhengyu9797.chatgpt.site>

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

## Upload to GitHub

1. Download and unzip this project.
2. Create a new empty repository on GitHub, for example `trashtech-wastewise`.
3. Upload the **contents inside the unzipped folder** to the repository and commit them.

For a larger upload, GitHub Desktop or the Git command line is more reliable than the browser uploader.

## Important demo note

This is a front-end prototype. Reports, points and voucher changes are stored only in the current browser session and reset after a refresh. The project does not yet connect to a real WhatsApp/Telegram chatbot, database, payment system or recycling partner.

The pilot context represented in the interface is Desa Mentari Block 8, with the community hall and supervised ground-floor collection point as supporting locations. The displayed dashboard figures are explicitly simulated presentation data.
