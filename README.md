# User Profile Management

A modern, full-featured web application for managing student profiles.

[**🌍 Live Demo: https://userprofilemanage.netlify.app/**](https://userprofilemanage.netlify.app/)

---

## 🚀 Features

- **Student Sign Up & Login:** Easy account creation and authentication, using localStorage—no backend needed.
- **Profile Dashboard:** Update and manage personal info, photo, education, skills, and experience.
- **Resume Upload:** Securely upload/view resume PDFs tied to each profile.
- **User Management Table:** Admin view for all users, with add and delete functionality. Modal-based user addition per modern UI standards.
- **Responsive, Attractive UI:** Built with React and Bootstrap, styled for ease and clarity.
- **Local Storage:** All data persists in the browser for learning/demo use.

---

## ✨ Demo Snapshots

- Login/Signup and Dashboard
- User table with add/view/delete
- Editable profile with image and resume upload

---

## 🛠 Setup & Local Development

1. **Clone the repository:**
   git clone [https://github.com/yourusername/user-profile-management.git](https://github.com/BhaviriSriGowri/User_profile_management_task)
   cd user-profile-management
2. **Install dependencies:**
   npm install
3. **Start the development server:**
    npm start

## 🏗 Deployment

This app is deployed using [Netlify](https://www.netlify.com/).

To deploy your own:
- Push your code to GitHub.
- Connect the repo to Netlify (one-click integration).
- Netlify will auto-build and deploy on push.
- Set the build command as `npm run build` and publish directory as `build`.

Check it out:  
👉 **[[Live Demo on Netlify](https://userprofilemanage.netlify.app/)]**

---

## 🗂 .gitignore (Essentials)

Make sure your `.gitignore` contains at least:
/node_modules
/build
/dist
.env*
.DS_Store
*.log
.vscode
.idea


## 📁 Project Structure
user-profile-management/
├── public/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ ├── Profile/
│ │ └── Users/
│ ├── pages/
│ └── utils/
├── .gitignore
├── README.md
├── package.json
└── ...

## 🙋 About

This project demonstrates a **single page application for user (student) profile management**, suitable for student portals, admin dashboards, or learning localStorage-based CRUD principles.

---

**Happy coding!**



