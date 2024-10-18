require('dotenv').config();
const express = require('express');
const cors = require("cors");
const model = require('./models');
const userRoutes = require('./routes/user');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors())

app.use('/', userRoutes);

model.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
