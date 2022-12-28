const amqp = require("amqplib");
const {MongoClient} = require('mongodb');
// const express = require("express");

// var channel, connection;
// connectQueue()  // call the connect function

// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(express.json());
// app.listen(PORT, () => console.log("Server running at port " + PORT));

// async function connectQueue() {
//     try {
//         connection = await amqp.connect("amqp://rmuser:rmpassword@localhost:");
//         channel    = await connection.createChannel()
        
//         await channel.assertQueue("test-queue")
        
//         channel.consume("test-queue", data => {
//             console.log(`${Buffer.from(data.content)}`);
//             channel.ack(data);
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


// const amqp = require("amqplib");

const client = new MongoClient('mongodb+srv://user:1QazxsW2@cluster0.oerzgcw.mongodb.net/?retryWrites=true&w=majority');

const start = async () => {
    try{
        await client.connect();
        console.log(123);
        const colls = await client.db().collection('stocks');
        await colls.insertOne({name: 'test', age: 1488})
        console.log((colls));
        const coll = await colls.find
    } catch(err){
        console.log(err);
    }
}

async function test(){
    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');    
    const channel = await connection.createChannel(); 
      
    const queue = 'messages';
    let rabbitResult;
    await channel.assertQueue(queue, {durable: false});
    
    await channel.consume(queue, async (msg)=>{
        console.log('CONSUME');
        console.log(msg.content.toString());
        rabbitResult = JSON.parse(msg.content.toString());
        console.log(rabbitResult);
        channel.ack(msg);
        // await channel.close();
        // await connection.close();  
    });
    

    

}
start();
// test();