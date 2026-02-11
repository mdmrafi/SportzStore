const express = require('express') 
const cors = require('cors') 
require('dotenv').config(); 
const app = express(); 
const User = require('./models/User');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(express.json()); 
app.use(cors()); 
app.use("/api/users",require("./routes/userRouter"));
app.use("/api/equipment",require("./routes/equipmentRouter"));
app.use("/api/allequipments",require("./routes/allequipmentRouter"))
app.use("/api/myequipment",require("./routes/myEquipmentRouter"))

const port = process.env.PORT || 5000; 

app.get("/",(req,res)=>{ 
  res.send("Working well!!!") 
}) 

// app.post('/users',async(req,res)=>{
//   const data = req.body;
//   const user = new User(data);
//   await user.save();
// })

const server = app.listen(port,()=>{ 
  console.log(`Server is running on port ${port}`); 
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
