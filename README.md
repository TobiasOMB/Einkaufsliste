# Einkaufsliste – statische Version für GitHub Pages

Diese Version läuft **komplett im Browser** (kein Node.js-Server, keine echte Datenbank, kein
echter Mailversand), damit sie sich direkt über **GitHub Pages** hosten lässt. GitHub Pages kann
nämlich nur statische Dateien (HTML/CSS/JS) ausliefern, keinen Node.js-Server ausführen.

## Was sich dadurch ändert (wichtig zu wissen)

- Alle Daten (Benutzer, Listen, Artikel) werden im **localStorage des Browsers** gespeichert –
  pro Gerät/Browser getrennt. Löscht jemand seine Browserdaten, sind auch die Demo-Daten weg.
- "E-Mails" (Passwort-Reset, Konto-Löschung) werden **nicht wirklich verschickt**. Stattdessen
  zeigt die Seite dir direkt ein Fenster mit dem Link, den eine echte Mail enthalten hätte – du
  klickst ihn einfach an.
- Passwörter werden nicht gehasht (es gibt ja keinen Server, der das übernehmen könnte). Das ist
  für eine Demo/Portfolio-Seite in Ordnung, aber **nicht** für echte, sensible Zugangsdaten gedacht.
- Falls du später wirklich persistente Daten, echten Mailversand und sichere Passwort-Hashes
  brauchst, bräuchtest du wieder einen echten Server (z. B. die frühere Node.js/Express-Version,
  gehostet auf einem Dienst wie Render, Railway oder einem eigenen vServer – GitHub Pages reicht
  dafür nicht aus).

## Neue Funktionen in dieser Version

- **Mehrere Listen pro Benutzer**: über den "+ Neue Liste"-Tab kannst du beliebig viele Listen
  anlegen und zwischen ihnen wechseln.
- **Gezieltes Teilen**: du wählst erst die gewünschte Liste (Tab) aus und lädst dann per E-Mail
  genau zu dieser einen Liste ein – andere eigene Listen bleiben davon unberührt.
- **E-Mail-Adresse ändern**: sowohl jeder Benutzer selbst (Button "Profil") als auch der Admin
  (Aktion "E-Mail ändern" in der Benutzertabelle) können die hinterlegte E-Mail aktualisieren,
  ohne dass die Liste verloren geht.
- Passwort-Sichtbarkeits-Icon (👁️) bei der Registrierung (und beim Passwort-Reset).
- Enter-Taste funktioniert jetzt überall zum Absenden (Login, Registrierung, Passwort-Felder).
- Bearbeiten-Button bei Artikeln wurde neu verdrahtet und funktioniert zuverlässig; der
  Kreis-Hover-Effekt bei den Icons ist jetzt ein echter Kreis (feste Breite/Höhe statt Padding).
- Favicon gesetzt.
- Footer "© 2026 Tobias Bobek. Alle Rechte vorbehalten." auf allen Seiten.

## Projektstruktur

```
index.html              Login (Startseite für GitHub Pages)
register.html           Registrierung
forgot-password.html    Passwort vergessen
reset-password.html     Neues Passwort vergeben (Link aus der simulierten Mail)
delete-confirm.html     Konto endgültig löschen (Link aus der simulierten Mail)
liste.html              Einkaufsliste(n) nach dem Login
admin.html              Admin-Bereich
style.css               Gemeinsames Stylesheet
js/store.js             Datenschicht (Benutzer, Listen, Session) in localStorage
js/ui.js                Toast-Meldungen & Modal-Fenster
images/                 Hintergrundbilder, Icons, Favicon
```

Demo-Admin-Zugang: **Admin** / **admin123**

---

## Anleitung: Hochladen zu GitHub & Veröffentlichen über GitHub Pages

Ziel-Repository: `https://github.com/TobiasOMB/Einkaufsliste`

### Variante A – über die GitHub-Weboberfläche (kein Terminal nötig)

1. Entpacke das zugeschickte ZIP auf deinem Rechner in einen Ordner.
2. Öffne dein Repository im Browser: `https://github.com/TobiasOMB/Einkaufsliste`
3. Falls das Repo noch leer ist: Klicke auf **"uploading an existing file"** (oder **Add file → Upload files**, falls schon Inhalte da sind).
4. Ziehe **alle Dateien und Ordner** aus dem entpackten Ordner (also `index.html`, `style.css`, den Ordner `js/`, den Ordner `images/`, `README.md` usw.) per Drag & Drop in das Upload-Feld. Moderne Browser laden dabei auch Unterordner (`js/`, `images/`) korrekt mit hoch.
5. Scrolle runter, schreibe eine Commit-Message (z. B. "Statische Version hinzufügen") und klicke auf **"Commit changes"**.
6. Gehe zu **Settings** (oben im Repo) → linke Seitenleiste **Pages**.
7. Unter **"Build and deployment"** → **Source**: wähle **"Deploy from a branch"**.
8. Unter **Branch**: wähle **`main`** und als Ordner **`/ (root)`**, dann **Save**.
9. Nach ca. 1–2 Minuten erscheint oben eine grüne Box mit dem Live-Link, typischerweise:
   `https://tobiasomb.github.io/Einkaufsliste/`
10. Öffne den Link – du landest direkt auf der Login-Seite (`index.html`).

### Variante B – über Git/Terminal (falls du Git installiert hast)

```bash
# 1. Repository klonen (falls noch nicht lokal vorhanden)
git clone https://github.com/TobiasOMB/Einkaufsliste.git
cd Einkaufsliste

# 2. Entpackte Projektdateien in diesen Ordner kopieren
#    (index.html, style.css, js/, images/, README.md, ...)

# 3. Alles zum Commit hinzufügen
git add .
git commit -m "Statische GitHub-Pages-Version hinzufügen"
git push origin main
```

Danach genauso wie in Variante A ab Schritt 6 fortfahren (Settings → Pages → main / root → Save).

### Wichtige Stolperfallen

- **Groß-/Kleinschreibung zählt**: GitHub Pages läuft auf Linux-Servern, `Index.html` ist nicht
  dasselbe wie `index.html`. Alle Dateinamen in diesem Projekt sind bewusst durchgehend
  klein geschrieben – bitte beim Hochladen nicht verändern.
- Die Datei **muss** `index.html` heißen und im **Root** des ausgewählten Branches/Ordners liegen,
  damit GitHub Pages sie automatisch als Startseite lädt.
- Falls du Dateien in einen Unterordner wie `/docs` hochlädst, musst du das bei "Branch/Folder"
  in den Pages-Einstellungen entsprechend auswählen (`/docs` statt `/ (root)`).
- Änderungen brauchen nach jedem `git push` bzw. Upload oft 30–90 Sekunden, bis sie auf der
  Pages-URL sichtbar sind (GitHub baut die Seite im Hintergrund neu).
