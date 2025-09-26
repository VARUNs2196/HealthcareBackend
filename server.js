const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const mappingRoutes = require('./routes/mappingRoutes');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.listen(PORT, () => {
    console.log(`Server is Started on port ${PORT}`);
});