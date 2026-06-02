## ?? SmartAttendance: Anti-Proxy Tracker

Digital tracking is broken; students text QR screenshots to friends outside class. **SmartAttendance** fixes this with a real-time, abuse-proof system ensuring authentic classroom presence.

* **60s Rolling QRs:** Tokens expire on the backend in 60s, making shared photos useless.
* **Geofencing:** App checks GPS via Haversine formula; check-ins fail if outside a 100m campus radius.
* **Live Sync:** Firestore \onSnapshot\ updates the missing roster and turnout metrics instantly without refreshes.
* **Admin Tools:** Multi-tab sidebar to add courses, filter student profiles, and export \.csv\ reports in one click.

**Tech:** React, TypeScript, Vite, Firebase Firestore.
