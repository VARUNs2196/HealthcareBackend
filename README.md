Healthcare Backend API
Table of Contents
Project Title

Business Understanding

Technologies

Setup and Installation

API Endpoints

Screenshots and Results

Credits

Business Understanding
This project is a backend system for a healthcare application, developed using Node.js and Express.js. It provides a secure and robust API for managing user, patient, and doctor data.

Technologies
Backend Framework: Node.js and Express.js

Database: PostgreSQL

Database Driver: pg

Authentication: jsonwebtoken and bcryptjs

Environment Variables: dotenv

API Client: Postman/Insomnia

Setup and Installation
Clone the repository:

git clone <your-repository-url>
cd healthcare-backend

Install dependencies:
This project uses Node.js, so you'll need to install the dependencies from the package.json file.

npm install

Set up the PostgreSQL database:
Ensure you have a PostgreSQL database running. Create a new database for this project. You'll need to manually create the tables. Here is the SQL schema based on your code:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255)
);

CREATE TABLE patient_doctor_mappings (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE (patient_id, doctor_id)
);

Configure environment variables:
Create a .env file in the project root with the following variables:

PORT=6000
DATABASE_URL='postgresql://your_user:your_password@localhost:5432/your_db_name'
JWT_SECRET='your-super-secret-key'

Run the development server:

node server.js

The API will be available at http://localhost:6000.

API Endpoints
All endpoints require the x-auth-token header for authentication unless otherwise noted.

Authentication

POST /api/auth/register/ - Register a new user (public endpoint)

POST /api/auth/login/ - Log in and get a JWT token (public endpoint)

Patient Management

POST /api/patients/ - Add a new patient

GET /api/patients/ - Retrieve all patients created by the authenticated user

GET /api/patients/:id - Get a specific patient's details

PUT /api/patients/:id - Update patient details

DELETE /api/patients/:id - Delete a patient record

Doctor Management

POST /api/doctors/ - Add a new doctor

GET /api/doctors/ - Retrieve all doctors

GET /api/doctors/:id - Get a specific doctor's details

PUT /api/doctors/:id - Update doctor details

DELETE /api/doctors/:id - Delete a doctor record

Patient-Doctor Mapping

POST /api/mappings/ - Assign a doctor to a patient

GET /api/mappings/ - Retrieve all patient-doctor mappings

GET /api/mappings/:patientId - Get all doctors assigned to a specific patient

DELETE /api/mappings/:id - Remove a doctor from a patient

Screenshots and Results
This section provides visual proof of the API functionality using curl commands and showing the corresponding database states.

Register a new user: Shows the curl command for user registration and the successful JSON response.

Log in and get a JWT token: Demonstrates a successful login and the JWT token returned in the response.

Add a new patient: Displays a curl command to add a patient and the JSON response with the new patient's details.

Retrieve all patients: Shows the curl command to retrieve the list of patients associated with the authenticated user.

Add a new doctor: Demonstrates adding a new doctor via curl and the JSON response with the doctor's details.

Update a patient's details: Shows a PUT request to update a patient's information and the database view reflecting the change.

Update a doctor's details: Shows a PUT request to update a doctor's information and the database view reflecting the change.

Assign a doctor to a patient: Displays the POST request to map a patient to a doctor and the resulting record in the patient_doctor_mappings table.

Retrieve all patient-doctor mappings: Shows the GET request to retrieve all mappings for the authenticated user.

Delete a patient/doctor/mapping: Displays the DELETE requests for each entity, confirming the record's successful removal.

Credits
Developed by 
VARUN SACHDEVA
