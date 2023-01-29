import express, { Response, Request } from "express" ;
import fileUpload from "express-fileupload";
import path from "path"

// import { env } from "./utils/env"
import {connectDb} from "./config/db" ;
import adminRoutes from "./components/admin/admin.routes"
import authorRoutes from "./components/author/author.routes"
// import userRoutes from "./components/user/user.routes"
import bookRoutes from "./components/books/books.routes"
import paymentRoutes from "./components/payment/payment.routes"
import {port} from "./config/env"
import {cloudCloudinary} from "./config/cloudinary.config"
import { connectRedis } from "./utils/redis";


const main = async () => {
    const app = express() ;

    app.use(express.json())
        .use(express.urlencoded({extended: true})) 
        .use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            abortOnLimit: true, // abort when file size exceed limits
            // createParentPath: true
            useTempFiles : true,
            tempFileDir : path.join(__dirname, "./upload"),
        
        }))
        .use(express.static("public"))

    app.use("*", cloudCloudinary)

    // const myurl = 'mongodb://localhost:27017';
 
    // MongoClient.connect(myurl, (err, client) => {
    //   if (err) return console.log(err)
    //   let db = client.db('test') 
        
    // })

    //connect redis
    connectRedis()

    //connect to database
    // connectDb(); 
     
    // const oneDay = 1000 * 60 * 60 * 24;
    // app.use( session({
    //     secret: 'unvsjnkljsbcnieugu3ty78047',
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { secure: true, maxAge: oneDay }
    // }) )

    app.use("/v1/admin", adminRoutes)
        .use("/v1/author", authorRoutes)
        .use("/v1/Books", bookRoutes)
        .use("/v1/Payment", paymentRoutes)

    app.get("/form", (req: Request, res: Response) => {
        
        res.status(200).sendFile(path.resolve(__dirname, "public/index.html"))

    })

    app.listen(port, () => {
        console.log( `server is up and running on ${port}` )
    })  
}
 
main().catch ((err) => {
    console.log(err.messsage)
}) ; 