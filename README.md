# Ruffian’s Legend — Next.js (App Router) + MUI + Google Sheets

Moderní, mobile-first web chovatelské stanice s jedním zdrojem pravdy: Google Sheets.

## Tech stack
- Next.js 15+ (App Router), TypeScript, React 19
- Material UI (MUI) + App Router SSR cache provider
- Google Sheets API v4 přes `googleapis` (server-only)
- Markdown: `react-markdown` + `remark-gfm`
- ISR / caching: 1h (3600s) pro public content
- Deploy: Vercel
- Local dev: Docker Compose + hot reload

---

## 1) Google Sheets setup (service account)

1. V Google Cloud Console:
   - vytvoř projekt
   - zapni **Google Sheets API**
   - vytvoř **Service Account**
   - vygeneruj **JSON key**

2. Otevři JSON key a vezmi:
   - `client_email` -> `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` -> `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (v .env ponech jako string s `\n`)

3. **Nasdílej spreadsheet** e-mailem service accountu (client_email) s právy editor.

---

## 2) Env proměnné

Zkopíruj `.env.example` do `.env` a doplň:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `SITE_BASE_URL`

---

## 3) Lokální běh (Docker)

```bash
cp .env.example .env
# edit .env
docker compose up --build
```

Web poběží na http://localhost:3000

---

## 4) Deploy na Vercel (checklist)

1. Import repo do Vercelu
2. Nastav Environment Variables:
   - GOOGLE_SHEETS_SPREADSHEET_ID
   - GOOGLE_SERVICE_ACCOUNT_EMAIL
   - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
   - SITE_BASE_URL (např. https://ruffianslegend.cz)
3. Deploy
4. Ověř:
   - /sitemap.xml
   - /robots.txt
   - /api/public/settings
   - /stenata/prihlaska (odeslání leadu a zápis do sheet `leads`)

---

## 5) Poznámky k produkci

- Public stránky jsou ISR (revalidate 3600s).
- Public API endpointy jsou force-static + revalidate 3600s.
- `POST /api/leads` má:
  - Zod validaci
  - honeypot silent-drop
  - rate-limit 5 / 10 min per IP (in-memory)
  - zapisuje do sheet `leads`

---

## 6) Sheets taby (očekávané názvy)

- settings (key/value)
- pages
- dogs
- litters
- puppies
- partners
- gallery_albums
- results
- leads (write-only append)
