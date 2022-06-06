const mongoose = require("mongoose");

const URL = "mongodb+srv://sanjay:m4dzcXDdSPVsA9Eq@cluster0.er88t.mongodb.net/Ecommerce?retryWrites=true&w=majority"

 mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => console.log("Database connection successfull !!"))
.catch((error)=>{
    console.log(error)
})

    