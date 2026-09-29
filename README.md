# Einkaufsliste – statische Version für GitHub Pages

https://tobiasomb.github.io/Einkaufsliste/

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
