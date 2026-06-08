\## 📱 SmartAttendance: Keeping Classroom Tracking Honest



Let's be real: digital attendance tracking is super easy to game. In almost every college lecture, someone just snaps a picture of the attendance QR code and texts it to their friends who are still chilling in the hostel. 



I built \*\*SmartAttendance\*\* to actually fix this loop hole. It's a real-time system that makes sure students are physically sitting in the room before they can mark themselves present. 



\---



\### 🤔 The Core Features (And How I Beat the Proxies)



\* \*\*60-Second Exploding QRs:\*\* The professor's screen shows a unique QR code that automatically expires on the backend every 60 seconds. If a student takes a picture and sends it to a friend, the code is already dead and useless by the time they try to scan it.

\* \*\*Classroom Geofencing:\*\* When a student scans the code, the app grabs their phone's live GPS coordinates. I used the Haversine formula to calculate the exact distance between the student and the classroom. If they aren't within a strict 100-meter radius of the room, the check-in gets blocked instantly.

\* \*\*Live-Updating Dashboard:\*\* Built using Firebase Firestore's real-time sync. As students walk through the door and scan, the professor can watch the turnout percentage grow and the "Missing List" shrink instantly on their screen without needing to refresh the page.

\* \*\*Simple Admin Tools:\*\* I added a clean sidebar for instructors so they can add new course codes on the fly, search for specific student profiles with a live filter, and download the final attendance sheet as an Excel-ready `.csv` file in one click.



\---



\### 🛠️ Why I Chose This Tech Stack



\* \*\*React + TypeScript + Vite:\*\* I went with TypeScript because dealing with live GPS coordinates can get messy, and it helps catch data type errors before they break the app. Vite keeps the local development setup incredibly fast.

\* \*\*Firebase Firestore:\*\* Instead of building a heavy backend database that constantly has to reload, Firestore uses direct web sockets to update the professor's screen the absolute second a student scans in.

\* \*\*HTML5 Geolocation:\*\* Native browser tools paired with math to find the physical distance on the Earth's surface between the device and the lecturer.



\---



\### 📁 Inside the Project Folder



I tried to keep the code as clean and modular as possible so it's easy for anyone else to read through:

```text

├── src/

│   ├── components/     # Simple UI pieces like the QR Canvas and Sidebar

│   ├── context/        # Where user log-ins and database sync live

│   ├── hooks/          # Custom shortcuts for getting location and auth data

│   ├── utils/          # The pure math logic (like the Haversine formula)

│   ├── App.tsx         # The main router handling pages

│   └── main.tsx        # App entry point

Documentation update for Pull Shark achievement.

