Issues Feb 9.

-----

 - Onboarding UI, inconsistent.
 
 - Idea - Onboarding, list of emails, if matches org, send magic link, url parameters to autofill onboarding, and would automaticcaly join org, maybe course

 - Onboarding Profile Image doesn't work.

 - Onboarding Profile Image, button appearance after loads.

- Create workspace, no error message if API down.

- Join course broken.

- Create course make all SSR and or Postgres side for assignments, modules, groups etc.

- Course, create module doesn't work. 

- Student dashboard placeholder.

- Average Grade Placeholder.

X - Hide all menu items "X".

- Delete notification is broken.

------

Consistent UI

-------


# CSBOX Education LMS

Welcome to the CSBOX Education LMS (Learning Management System) repository! This project is designed to help you quickly set up and deploy an internal educational platform using SvelteKit, TailwindCSS, and Supabase. This README will guide you through the setup process and provide an overview of the features and customization options available in this repository.

## Features

- **SvelteKit:** A cutting-edge framework for building modern web applications with a focus on performance and developer experience.
- **TailwindCSS:** A highly customizable CSS framework for crafting stylish and responsive user interfaces.
- **Supabase:** An open-source Firebase alternative that offers authentication, database, and storage services.

## Getting Started

Follow these steps to set up and utilize the CSBOX Education LMS:

1. **Clone the Repository:** Clone this repository to your local environment using the following command:

   ```bash
   git clone https://github.com/csboxio/csbox-frontend
   ```

2. **Install Dependencies:** Navigate to the repository directory and install the required dependencies:

   ```bash
   cd csbox-frontend
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and set the necessary environment variables:

   ```env
   PUBLIC_SUPABASE_URL=
   PUBLIC_SUPABASE_ANON_KEY=
   PRIVATE_CLOUDFLARE_SECRET_KEY=
   PUBLIC_SUPABASE_ID=
   DEVMODE=true
   PRIVATE_ADMIN_MASTER_KEY=
   ```

4. **Start the Development Server:** Launch the SvelteKit development server by executing the following command:
   ** Developers can have issues with ad-blockers blocking module imports. 
   ```bash
   npm run dev --host
   ```

   The application will be accessible at `http://localhost:5173`. 
   
   Some platforms are `http://localhost:5174`.

## DEV
ngrok http 5173 --domain joint-dear-lamb.ngrok-free.app

5. **Access the Protected API:**

   The internal API endpoint is `/api`. To access protected routes, implement authentication and authorization using Supabase. Refer to the `src/routes/api/` file for an example.

## Ports Used

- Port 5174
- Port 5173
- Port 4173
- Port 4174


## Load testing

Move to directory

```bash
cd artillery
```

Run test

```bash
artillery run first-test.yml --output test.json
```

Generate Report

```bash 
artillery report test.json
```

If canvas has (page error) reinstall redis.





