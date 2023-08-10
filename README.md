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

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5173`. 
   
   Some platforms are `http://localhost:5174`.


5. **Access the Protected API:**

   The internal API endpoint is `/api`. To access protected routes, implement authentication and authorization using Supabase. Refer to the `src/routes/api/` file for an example.

## Production Deployment

The repository includes GitHub Actions that automate deployment to the internal CSBOX production URL at `csbox.io`. Pushing changes to the `main` branch triggers the build and deployment process through GitHub Actions into a Cloudflare Worker.

## Ports Used

- Port 5174
- Port 5173
- Port 4173
- Port 4174


## Load testing

1. Open docker desktop

2. Setup graphite server 
```bash
docker run -d \
 --name graphite \
 --restart=always \
 -p 80:80 \
 -p 2003-2004:2003-2004 \
 -p 2023-2024:2023-2024 \
 -p 8125:8125/udp \
 -p 8126:8126 \
 graphiteapp/graphite-statsd```





