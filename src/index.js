const express = require ('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(morgan('combined'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`))