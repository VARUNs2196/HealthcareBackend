# Healthcare Backend API

A secure and modular backend system for managing healthcare data.  
Built with **Node.js**, **Express.js**, and **PostgreSQL** for persistence.  

---



## Table of Contents
- [Project Understanding](#project-understanding)
- [Data Understanding](#data-understanding)
- [Screenshots of Visualizations/Results](#screenshots-of-visualizationsresults)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)

---

## Project Understanding
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
<img width="940" height="166" alt="image" src="https://github.com/user-attachments/assets/22cc5f64-b6ff-46e0-878d-5cf17bedf88e" />
<img width="940" height="152" alt="image" src="https://github.com/user-attachments/assets/72c2482d-f354-4226-a74c-4e4213035878" />


### Log in and get a JWT token
<img width="940" height="126" alt="image" src="https://github.com/user-attachments/assets/d8f02da9-87fd-4d50-9a37-6c708611b623" />


### Add a new patient
<img width="586" height="245" alt="image" src="https://github.com/user-attachments/assets/b4ff9b6e-dd26-4154-b16b-b00b68f7bb27" />
<img width="940" height="88" alt="image" src="https://github.com/user-attachments/assets/37546d41-528c-4462-8e85-465ef1da1e0d" />
<img width="622" height="166" alt="image" src="https://github.com/user-attachments/assets/bcc2bff0-8ec7-4da0-b547-9099df2afe59" />


### Add a new doctor
<img width="559" height="272" alt="image" src="https://github.com/user-attachments/assets/34631c88-b0e8-4aab-b7fb-357d39127611" />
<img width="706" height="102" alt="image" src="https://github.com/user-attachments/assets/a8a39300-7741-4e18-ae28-1a7ffaa55d99" />


### Retrieve all patients
<img width="881" height="139" alt="image" src="https://github.com/user-attachments/assets/000a7186-b647-4956-a691-62baf38609c3" />


### Get a specific patient’s details
<img width="906" height="86" alt="image" src="https://github.com/user-attachments/assets/c63cd66b-d440-449b-babf-5bc1fe9331f4" />


### Update a patient’s details
<img width="558" height="236" alt="image" src="https://github.com/user-attachments/assets/c402df27-d625-4bde-88ce-f91fb1d1691e" />
<img width="597" height="159" alt="image" src="https://github.com/user-attachments/assets/e2bf75f4-a423-4c0f-8e79-997256b20ba6" />


### Retrieve all doctors
<img width="940" height="118" alt="image" src="https://github.com/user-attachments/assets/78f38dae-cbd1-42f1-ac44-c1144bff2565" />


### Get a specific doctor’s details
<img width="558" height="139" alt="image" src="https://github.com/user-attachments/assets/66761a30-4387-4475-b288-e7adb3cd339b" />


### Update a doctor’s details
<img width="669" height="272" alt="image" src="https://github.com/user-attachments/assets/f4467f11-0673-4457-9527-28be2ecc8b56" />
<img width="709" height="105" alt="image" src="https://github.com/user-attachments/assets/27d4e53a-dd8d-4844-8457-70654a73efe1" />


### Assign a doctor to a patient
<img width="940" height="111" alt="image" src="https://github.com/user-attachments/assets/1daababd-e115-40fd-b992-18ca9e907fa0" />


### Retrieve all patient-doctor mappings
<img width="940" height="122" alt="image" src="https://github.com/user-attachments/assets/1e16660c-c8e7-4f46-808a-f2517b081240" />


### Get all doctors assigned to a specific patient
<img width="940" height="61" alt="image" src="https://github.com/user-attachments/assets/389f4af8-de1e-4593-a093-75b55fde534e" />


### Remove a doctor from a patient
<img width="563" height="134" alt="image" src="https://github.com/user-attachments/assets/d71db96b-bfa2-43a0-bc85-d1ca7a6c2c56" />


### Delete a patient record
<img width="940" height="86" alt="image" src="https://github.com/user-attachments/assets/4f27a344-5393-466f-8ea0-710fe9ab1abf" />


### Delete a doctor record
<img width="541" height="131" alt="image" src="https://github.com/user-attachments/assets/115dab79-5a2a-4457-9863-bb450a33c60a" />


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

-- Patient-Doctor Mappings
CREATE TABLE patient_doctor_mappings (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE (patient_id, doctor_id)
);
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
PORT=6000
DATABASE_URL=postgresql://username:password@localhost:5432/healthcare_db
JWT_SECRET=your_secret_key
```
### Run the Server

```bash
node server.js
The server runs at:  
[http://localhost:6000](http://localhost:6000)
```


## Approach

- **JWT authentication** protects endpoints  
- **Role-based control**: Users can only access their own patients/mappings  
- **Passwords hashed** with bcrypt  
- **Postgres queries** handled via `pg`  
- **Error handling** with descriptive messages  
