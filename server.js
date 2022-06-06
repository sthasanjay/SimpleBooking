const app =require('./app');
const dotenv = require("dotenv");

require("./config/db")  


// Handling Uncaught Exception
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the sever due to uncaught Exception `);
    process.exit(1);
})

dotenv.config({path:"config.env"})
app.listen(process.env.PORT, ()=>{
    console.log(`sever is working on http://localhost:${process.env.PORT}`)
})


// unhandle promise rejection

process.on("unhandledRejection", ((err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandle Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
)