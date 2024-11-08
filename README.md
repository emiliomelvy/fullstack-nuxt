This project is a Nuxt.js-based web application that demonstrates user authentication and role-based access control for admin and employee roles. The app includes client-side and server-side validation, secure session management, and role-based route restrictions.

# Key Features

- User Authentication: Login with username and password using H3 sessions.
- Role-Based Routing: After login, users are redirected to the home page:
  - Admin users can access both /home and /admin pages.
  - Employee users can access /home but are restricted from the /admin page.
- Client-Side Validation: Form validation is implemented on the client side with Yup.
- Server-Side Validation: Server-side input validation is implemented using Zod.
- Server Middleware Authorization: Access control for protected routes to ensure secure, role-based navigation.

# Tech Stack

- Nuxt 3 with TypeScript for a modern, type-safe web application.
- H3 Session for secure, server-side session management.
- Tailwind CSS for responsive, utility-first styling.
- Nuxt UI (Headless UI) for accessible, composable UI components.
- Yup for client-side validation.
- Zod for server-side validation to ensure data integrity.

Name: Emilio Melvy A S
