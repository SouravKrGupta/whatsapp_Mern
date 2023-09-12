//importing
import express from "express"
import mongoose from "mongoose";

import Messages from "./dbMessage.js";
import Pusher from "pusher";
import cors from "cors";
//app config
const app =express()
const port =process.env.PORT ||9000

const pusher = new Pusher({
    appId: "1519489",
    key: "3305523bf96eeffe80e2",
    secret: "5cd7e12590ef0c1c9283",
    cluster: "ap2",
    useTLS: true
  });

//midleware

app.use(express.json());
app.use(cors())


//DB config
const connection_url ='mongodb+srv://whatsapp:whatsapp1234@cluster0.siu3x5r.mongodb.net/?retryWrites=true&w=majority'
 
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//???
const db = mongoose.connection
db.once('open',()=>{
    console.log("DB connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log(change);
        if(change.operationType=='insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            }
           
            );
        }else{
            console.log('Error triggering Pusher')
        }
        

            });
        
    });

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));


app.get('/messages/sync',(req,res)=>{
    const dbMessage =req.body;

    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)

        }else
        {
            res.status(200).send(data)
        }
    })
})
app.post('/messages/new',(req,res)=>{
    const dbMessage =req.body

    Messages.insertMany(dbMessage, (err,data)=>{
        if(err){
            res.status(500).send(err)
            
           
        }else
        {
            res.status(201).send(data)
        }
    })
})
    

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`));
    