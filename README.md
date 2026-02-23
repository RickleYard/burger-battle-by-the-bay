# Burger Battle By The Bay

Web app for **SubWest Rotary**'s Burger Battle By The Bay — April 11, 2026 at Pensacola Maritime Park (Festival Grounds). Compete for the Green Apron.

## Event info (from flyer)

- **Date:** April 11, 2026  
- **Time:** 11:00 AM – 1:30 PM  
- **Location:** Pensacola Maritime Park – Festival Grounds  
- **Contact:** iburgerbattle@gmail.com  
- **Sponsor:** The Butcher Shoppe  

## Run locally

1. Open the folder and serve it (any static server is fine):
   - **Python 3:** `python3 -m http.server 8000` then open http://localhost:8000
   - **Node:** `npx serve .` or `npx http-server`
   - Or open `index.html` directly in a browser (some features may need a server)

2. Edit `index.html` to add real team names and descriptions in the Contestants and Vote sections.

## What’s included

- **index.html** — One-page layout: hero, about, contestants, vote form, results
- **css/style.css** — Green/gold theme inspired by the flyer
- **js/main.js** — Vote form, localStorage (one vote per device), mobile menu

Votes are stored in the browser only. To collect votes across devices, add a small backend (e.g. Node/Express or a serverless function) and point the form and results to it.

## Optional: QR code

If your flyer’s QR code should point here, host this app at a URL (e.g. GitHub Pages, Netlify, or your club’s site) and set the QR code target to that URL.
