const marketDb = require("mongoose")
const express = require("express")
const cors = require("cors")
const routes  = require("./routes")
const PORT = 3000
const app = express()
const Usermodel = require("./models/User.model")

app.use(cors({
    origin:"*",
    method:["GET","POST","PUT","DELETE"],
}));
app.get("/data",async(req,res)=>{
    data = await Usermodel.find({});
    res.json(data);
})

app.use(express.json())
app.use(routes);

marketDb.connect(
    "mongodb+srv://jatingarg718:98777Jatin@cluster1.jreld.mongodb.net/"
)
.then(()=>{
    console.log("Connected to the database")
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    })
});


