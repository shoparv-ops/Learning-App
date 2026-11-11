# Learning App — Submission 1

A small React + TypeScript application created with Vite.

## Requirements covered

- Displays the student's name: **Arvin Shopon**.
- Uses a reusable `LearningEntry` component.
- Defines the component props with a TypeScript interface.
- Includes the additional string property `category` in the props type.
- Displays two learning entries with different values, including different categories.

## Run the application

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local address printed by Vite (normally http://localhost:5173).

## Check the production build

```bash
npm run build
npm run preview
```

## Main files

- `src/types/LearningEntry.ts` — typed props for a learning entry.
- `src/components/LearningEntry.tsx` — reusable component.
- `src/App.tsx` — student name and two different entries.
- `src/App.css` and `src/index.css` — page styling.

## How the implementation works

`LearningEntryProps` is a TypeScript interface. It describes the values that every `LearningEntry` must receive: `topic`, `date`, `learned`, and the additional string property `category`.

The `LearningEntry` component receives those props and renders them. `App.tsx` uses the same component twice with different prop values. This demonstrates reusability and makes TypeScript check that both entries provide the required properties.

## Before submitting

1. Run `npm install`.
2. Run `npm run dev` and check that the page opens and displays the student name and both entries.
3. Run `npm run build` and make sure it completes without errors.
4. Commit and push the project to the same individual GitHub repository you will use throughout the course.
5. Make sure the teacher has access to the repository.
6. Submit the GitHub repository URL in Moodle.

Do not commit passwords, tokens, private `.env` files, or `node_modules`.
