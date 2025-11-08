# GK Group - Premium Corporate Website

This repository contains the source code for the official corporate website of GK Group, a diversified business entity with interests in textiles and steel, based in Palakkad, Kerala, India.

The website is built with Django and designed to be a premium, modern, and responsive platform to showcase the company's profile, business divisions, and services.

**Live Demo:** [https://gk-group.onrender.com](https://gk-group.onrender.com)

## Features

*   **Modern & Responsive Design:** A premium, mobile-first user interface built with Bootstrap 5.
*   **Multi-Page Architecture:** Separate, SEO-friendly pages for Home, About, GK Textiles, GK Steels, and Contact.
*   **Dynamic Content:** Easily manageable content through the Django admin panel.
*   **Functional Contact Form:** A secure contact form that stores messages in the database and sends email notifications.
*   **SEO Optimized:** Includes meta tags, Open Graph protocol, and JSON-LD structured data for better search engine visibility.
*   **Interactive Elements:** Smooth scrolling, animations, and an image gallery to enhance user experience.

## Technology Stack

*   **Backend:** Django
*   **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
*   **Database:** SQLite3 (for development), adaptable for PostgreSQL in production.
*   **Deployment:** Gunicorn, Whitenoise, Render

## Local Development Setup

Follow these steps to set up the project on your local machine.

### 1. Prerequisites

*   Python 3.9+
*   Git

### 2. Clone the Repository

```bash
git clone https://github.com/diljithmon170/gk-group.git
cd gk-group/gk_group
```

### 3. Create a Virtual Environment

Create and activate a virtual environment to manage project dependencies.

*   **Windows:**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
*   **macOS / Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

### 4. Install Dependencies

Install all the required packages using the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the `gk_group` root directory by copying the example file.

```bash
cp .env.example .env
```

Open the `.env` file and set the following variables:

```
SECRET_KEY='your-secret-key'
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```
*You can generate a new `SECRET_KEY` using an online generator or a Django utility.*

### 6. Run Database Migrations

Apply the database schema to your local SQLite database.

```bash
python manage.py migrate
```

### 7. Create a Superuser

Create an admin user to access the Django admin panel.

```bash
python manage.py createsuperuser
```

### 8. Run the Development Server

Start the Django development server.

```bash
python manage.py runserver
```

The website will be available at `http://127.0.0.1:8000/`. The admin panel can be accessed at `http://127.0.0.1:8000/admin/`.

## Deployment on Render

This project is configured for easy deployment on a platform like Render.

### Render Configuration

*   **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput`
*   **Start Command:** `gunicorn gk_group.wsgi:application`

### Environment Variables

Set the following environment variables in the Render dashboard:

*   `SECRET_KEY`: Your production secret key.
*   `DEBUG`: `False`
*   `ALLOWED_HOSTS`: `your-render-domain.onrender.com` (e.g., `gk-group.onrender.com`)

## Project Structure

*   `gk_group/`: The main Django project directory containing settings and project-level URL configurations.
*   `gk_group_app/`: The Django app containing the core logic, models, views, templates, and static files for the website.
*   `manage.py`: The command-line utility for Django administrative tasks.
*   `requirements.txt`: A list of all Python dependencies.
*   `db.sqlite3`: The SQLite database file for local development.

## Contributing

Contributions, issues, and feature requests are welcome. Please feel free to open an issue to discuss your ideas.