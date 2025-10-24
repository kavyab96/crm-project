const express = require('express');
const app =express();
const cors = require('cors');
const userRoutes = require("./app/routes/userRoutes");
const customerRoutes = require("./app/routes/customerRoutes");
const caseRoutes = require("./app/routes/caseRoutes");

const { connectDB } = require('./config/db');
const errorHandler = require('./app/middleware/errorHandler');
const cookieParser = require('cookie-parser');

const PORT =3000  
connectDB()


app.use(cors(
  {
    origin:'http://localhost:5173',
    credentials:true
  }
))
//middleware to parse JSON bodies   
app.use(express.json());
app.use(cookieParser());


app.get("/test", async (req, res) => {
  console.log("Login route hit"); // 👈 check this
  // your login logic here
});

app.use('/api/user',userRoutes);
app.use('/api/customers',customerRoutes);
app.use('/api/case',caseRoutes);

//errorHandler
app.use(errorHandler)


//start server
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);    
})

