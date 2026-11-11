# Learning App – Submission 5

**Student:** Arvin Shopon  
**Course task:** Submission 5 – Learning App

## 1. Overview

Learning App is a small learning journal. The user can add a record on the Home page and view saved records on the Entries page. The frontend uses React, TypeScript, Vite and React Router. The backend uses Node.js, Express and MariaDB.

## 2. Pages and navigation

- **Home (`/`)** – contains the learning-entry form. The user enters a topic, date, category, description and confidence level.
- **Entries (`/entries`)** – loads saved records from the database and displays them as a list. The Refresh list button requests the records again.
- React Router `Routes` and `Route` select the page. `NavLink` provides navigation and indicates the active page.

The application is divided into reusable components:
- `EntryForm` – form for creating a learning record.
- `LearningEntry` – presentation of one saved record.
- `App` – shared header, navigation, footer and page routing.

## 3. Application layers

1. **Presentation layer (`src/pages`, `src/components`)** – displays pages, form controls and learning records.
2. **Frontend API layer (`src/api/api.ts`)** – sends HTTP requests to the backend and handles responses.
3. **Backend/API layer (`backend/server.ts`)** – Express routes validate requests, execute database operations and return JSON.
4. **Data layer (`backend/db.ts`, MariaDB)** – the connection pool and `learning_entries` table store the records.

This separation makes the application easier to maintain. The pages do not contain SQL queries, and the database credentials are not placed in frontend code.

## 4. Frontend routes and backend routes

These are different route systems:

| Type | Route | Purpose |
|---|---|---|
| Frontend | `/` | React Home page |
| Frontend | `/entries` | React Entries page |
| Backend API | `GET /api/entries` | Returns saved entries as JSON |
| Backend API | `POST /api/entries` | Validates and saves a new entry |
| Backend API | `GET /api/health` | Simple backend health check |

React Router changes the visible page in the browser. Express receives API requests and communicates with MariaDB.

## 5. Why REST is suitable

REST is suitable because the frontend and backend are separate and communicate through standard HTTP requests. `GET` retrieves learning entries and `POST` creates a new entry. The API returns JSON and uses meaningful HTTP status codes, such as `200`, `201`, `400` and `500`.

This structure is simple, predictable and can be used by other clients in the future without rewriting the database logic.

## 6. Database

The backend expects a MariaDB table named `learning_entries` in a database that the student account is authorised to use. The SQL table definition is in `database/schema.sql`.

The table contains:
- `id` – primary key
- `topic` – learning topic
- `entry_date` – date of the learning activity
- `learned` – description
- `confidence` – value from 1 to 5
- `category` – category of the entry

The POST route uses parameterised SQL (`?` placeholders) to avoid inserting user input directly into the SQL statement.

## 7. Setup and running the application

Requirements: Node.js, npm and an accessible MariaDB database.

1. Open the project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the table by running `database/schema.sql` inside the database/schema assigned to your MariaDB account. Do not try to create a database if your account does not have permission.
4. Copy `backend/.env.example` to `backend/.env`.
5. Enter the database host, port, username, password and authorised database name in `backend/.env`.
6. Start both frontend and backend:

   ```bash
   npm run dev
   ```

7. Open the frontend at `http://localhost:5173/`. The backend runs at `http://localhost:3001/`.

Never commit `backend/.env` or any file containing a password. The `.gitignore` file excludes environment files.

## 8. How to test

1. Open Home and submit a learning entry with all fields completed.
2. After a successful save, the application navigates to Entries.
3. Entries makes a new `GET /api/entries` request and displays the saved record.
4. Refresh the browser or press **Refresh list**. The record should still be present because it is stored in MariaDB.
5. Try submitting an empty or invalid form field. Browser validation and backend validation help prevent invalid records.
6. Check the backend health endpoint at `http://localhost:3001/api/health`.

## 9. Submission 5 requirements

- [x] React Router provides Home and Entries pages.
- [x] Link navigation is provided with `NavLink`.
- [x] Pages and reusable components are separated.
- [x] Database-backed GET and POST endpoints are retained.
- [x] The form remains accessible on Home.
- [x] The Entries list reloads after saving and can be refreshed manually.
- [x] README explains pages, components, application layers, frontend/backend routes and REST.
- [x] No dynamic details route or Express/PHP comparison is added because neither is required.

Before submitting, run the production build, commit and push the latest changes, and verify that the teacher can access the GitHub repository.
