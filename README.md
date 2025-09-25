# Healthcare Backend API

A secure and modular backend system for managing healthcare data.  
Built with **Node.js**, **Express.js**, and **PostgreSQL** for persistence.  

---

## Demo Link
> (Add deployment link here if hosted, e.g., Render, Railway, or local demo URL)

---

## Table of Contents
- [Business Understanding](#business-understanding)
- [Data Understanding](#data-understanding)
- [Screenshots of Visualizations/Results](#screenshots-of-visualizationsresults)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)

---

## Business Understanding
Healthcare providers often need a digital solution to manage **patients, doctors, and mappings** between them.  

This backend:
- Allows users to **register/login securely**.  
- Enables doctors to be **created, updated, and managed**.  
- Supports **patient-doctor mappings** (many-to-many relationship).  
- Provides authentication and authorization with **JWT**.

It can serve as the backend for:
- Appointment booking apps  
- Telemedicine platforms  
- Medical record management  

---

## Data Understanding

### Entities & Relationships
- **Users** → register/login with email & password  
- **Patients** → belong to a specific user  
- **Doctors** → independent entity with a `specialty`  
- **Patient_Doctor_Mappings** → connects patients with doctors  

### Database Schema
```sql
Users(id, name, email, password)
Patients(id, name, user_id)
Doctors(id, name, specialty)
Patient_Doctor_Mappings(id, patient_id, doctor_id)
```
## Screenshots of Visualizations/Results

### Register a new user
![Register User](screenshots/register.png)

### Log in and get a JWT token
![Login](screenshots/login.png)

### Add a new patient
![Add Patient](screenshots/add-patient.png)

### Add a new doctor
![Add Doctor](screenshots/add-doctor.png)

### Retrieve all patients
![All Patients](screenshots/get-patients.png)

### Get a specific patient’s details
![Patient Details](screenshots/get-patient.png)

### Update a patient’s details
![Update Patient](screenshots/update-patient.png)

### Retrieve all doctors
![All Doctors](screenshots/get-doctors.png)

### Get a specific doctor’s details
![Doctor Details](screenshots/get-doctor.png)

### Update a doctor’s details
![Update Doctor](screenshots/update-doctor.png)

### Assign a doctor to a patient
![Assign Doctor](screenshots/assign-doctor.png)

### Retrieve all patient-doctor mappings
![Mappings](screenshots/get-mappings.png)

### Get all doctors assigned to a specific patient
![Patient Doctors](screenshots/get-patient-doctors.png)

### Remove a doctor from a patient
![Remove Mapping](screenshots/remove-mapping.png)

### Delete a patient record
![Delete Patient](screenshots/delete-patient.png)

### Delete a doctor record
![Delete Doctor](screenshots/delete-doctor.png)

---

## Technologies

- **Node.js (Express.js)**
- **PostgreSQL (primary database)**
- **JWT** (authentication & authorization)
- **bcrypt.js** (password hashing)
- **dotenv** (environment configuration)
- *(Optional)* Mongoose for MongoDB integration

---

## Setup

### Prerequisites

- Node.js (>= 14.x)
- PostgreSQL installed and running
- Postman/Insomnia for API testing

### Installation

```bash
git clone <your-repo-url>
cd healthcare-backend
npm install
```
### Database Setup

Run this SQL in your PostgreSQL database:

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Patients
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Doctors
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL
);
```
-- Patient-Doctor Mappings
CREATE TABLE patient_doctor_mappings (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE (patient_id, doctor_id)
);
### Environment Variables

Create a `.env` file in the root of the project:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/healthcare_db
JWT_SECRET=your_secret_key
```
### Run the Server

```bash
node server.js
The server runs at:  
[http://localhost:5000](http://localhost:5000)
```


## Approach

- **JWT authentication** protects endpoints  
- **Role-based control**: Users can only access their own patients/mappings  
- **Passwords hashed** with bcrypt  
- **Postgres queries** handled via `pg`  
- **Error handling** with descriptive messages  
