# CLAUDE.md — piino-web (piino.de)

Öffentliche Website **piino.de**: Studio-Startseite, Produktseiten (Nodus, Rebokeh), zwei Langtexte, Rechtstexte und ein kleines PHP-Backend.

## Struktur
- **Seiten:** `index.html` (Studio & Produkte), `nodus.html`, `rebokeh.html` (Closed-Beta-Landingpage), `impressum.html`, Rechtstexte (`datenschutz.html`, `rebokeh-datenschutz.html`, `rebokeh-nutzungsbedingungen.html`, `whitespace-datenschutz.html`), Artikel (`ncm-m5pro.html`, `honor-magicbook-art-14-linux.html`), `stats.html` (intern, `noindex`).
- **Design-System:** `styles.css` (Tokens, Komponenten, Artikel-Bausteine), `app.js` (Sprache, Hell/Dunkel, Mobilnavigation, Reveal), `assets/piino-wordmark.svg` + `assets/piino-mark.svg` + `favicon.svg`.
- **Assets:** `screenshots/` (Nodus), `screenshots/rebokeh/`, App-Icons (`*-app-icon.png`), `og-piino.png` / `og-rebokeh.png` (Link-Vorschau), `downloads/` (APKs).
- **Hosting: Cloudflare Pages, rein statisch.** Dort wird **kein PHP ausgeführt** — `.php`-Dateien werden als Quelltext ausgeliefert, `.htaccess` wird ignoriert. Deshalb liegt in diesem Repo kein Backend-Code; `api/` ist in `.gitignore`. Serverlogik gehört in eine Cloudflare Function/Worker oder auf einen echten PHP-Host mit eigenem, **privatem** Repo.
  - Falls die Trial-Prüfung wieder aufgebaut wird: Die Antwort an die Nodus-App (`status`, `device_id`, `first_seen_ms`, `is_expired`, `server_time_ms`) ist Vertrag und darf sich nicht ändern.
  - Niemals Schlüssel oder Passwörter in Dateien dieses Repos — es ist öffentlich. Keine IP-Adressen speichern; die Datenschutzerklärungen sagen genau das zu.
- **`version.json`:** steuert App-Update-Infos (versionCode/Name, `apkUrl`, `playStoreUrl`, Release Notes). Bei neuem App-Release hier mitziehen (und `stats.html` angleichen).

## Konventionen
- Reines HTML/CSS/JS + PHP, **kein Build-Step**. Änderungen direkt an den Dateien.
- **Zweisprachig DE/EN im selben Dokument:** Jede übersetzte Passage existiert zweimal, als `<span lang="de">` / `<span lang="en">` (oder ganze Blöcke `<div class="prose" lang="de">`). `styles.css` blendet die nicht aktive Sprache aus, `app.js` setzt `data-lang` auf `<html>` und merkt die Wahl in `localStorage`. Neue Texte **immer in beiden Sprachen** ergänzen, sonst fehlt der Absatz in einer Sprache komplett.
- Seitentitel und Meta-Beschreibung je Sprache über `<meta name="title-de|title-en">` bzw. `description-de|description-en`.
- **Kopf- und Fußbereich sind pro Seite dupliziert** (kein Template-System): Wird die Navigation geändert, muss das in allen HTML-Dateien passieren.
- Farben, Abstände und Typografie ausschließlich über die Custom Properties aus `styles.css` (`--ink`, `--paper`, `--sage`, `--nodus`, `--rebokeh`, …). Produktbereiche setzen ihren Akzent über `style="--p: var(--nodus)"`.
- Hell ist Standard, Dunkel folgt dem System und lässt sich per Schalter überschreiben. Neue Flächen immer gegen beide Modi prüfen.
- **Keine Secrets im Repo** (API-Keys, Backend-Endpunkte sauber halten) — passt zur serverseitigen Trial-Validierung von Nodus.
- Rechtstexte sind produktiv in den Stores verlinkt: Die deutsche Fassung ist verbindlich, die englische ist Übersetzung. Vor Änderungen Konsistenz mit den Apps prüfen.
- Keine Tracker, keine Cookies, keine externen Skripte außer Google Fonts.

## Lokal ansehen
```bash
python3 -m http.server 8777
```
