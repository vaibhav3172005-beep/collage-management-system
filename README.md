<div align="center">
  <img src="https://img.icons8.com/color/96/000000/university.png" alt="Logo" width="80" height="80">
  <h1 align="center">College Management System (COCSIT)</h1>

  <p align="center">
    A modern, full-stack React frontend designed for enterprise-scale university administration.
    <br />
    <br />
    <a href="https://college-management-system.netlify.app"><strong>☀️ View Live Demo »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## 🎓 About The Project

This **College Management System** was built from the ground up as a responsive, deeply interactive web portal designed for real-world university environments. It features a complete role-based architecture, allowing for entirely different dashboard experiences depending on whether the user is an **Admin**, **Faculty Member**, or **Student**.

The UI is built utilizing modern **Glassmorphism** design principles and utilizes **Framer Motion** for state-of-the-art micro-interactions and page transitions, ensuring the application feels incredibly premium and fluid.

### ✨ Key Features

*   **🔒 Role-Based Access Control (RBAC):** Distinct portals and tools for `Admin`, `Staff`, and `Student` accounts.
*   **🏢 Multi-Department Architecture:** Context-aware switching between university departments (e.g., *BCA, AI-ML, Data Science, BBA*).
*   **📢 Real-Time Data Streams:**
    *   **Admins** can push interactive announcements targeted at specific departments.
    *   **Staff** can upload assignments, PDFs, and video lectures.
    *   **Students** receive dynamic "Notification & Study Material" feeds based on their exact department & semester.
*   **📊 Interactive Dashboards:** Circular visual attendance trackers, quick-action "Apply for Document" buttons, and system-wide statistic cards.
*   **💅 Premium UX/UI Ecosystem:** Completely custom `index.css` styling powered by Tailwind CSS to create deep indigo and emerald glass themes, paired with custom Toast notifications and smooth skeletal modals.

### 🛠️ Built With

The application leverages the absolute latest standards in modern frontend web development:

*   [![React][React.js]][React-url]
*   [![Vite][Vite.js]][Vite-url]
*   [![Tailwind][Tailwind.css]][Tailwind-url]
*   [![Framer][Framer.motion]][Framer-url]

<!-- GETTING STARTED -->
## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vaibhav3172005-beep/collage-management-system.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

<!-- USAGE EXAMPLES -->
## 💻 Usage

To test the role-based views, you can use the following mock credentials on the `/login` page:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@cocsit.edu` | `password` |
| **Faculty** | `staff@cocsit.edu` | `password` |
| **Student** | `student@cocsit.edu` | `password` |

<!-- ROADMAP -->
## 🗺️ Roadmap & Future Enhancements

- [x] Integrate Framer Motion page transitions
- [x] Build multi-department stream feeds for Students
- [ ] Implement backend database architecture using Supabase / PostgreSQL
- [ ] Build end-to-end user authentication and JWT session storage
- [ ] Add explicit Dark/Light mode color token toggling

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Framer.motion]: https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]: https://www.framer.com/motion/
