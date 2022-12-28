const amqp = require("amqplib");
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


async function test(){
    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');    
    const channel = await connection.createChannel(); 
    console.log('conn', connection, 'chan');   
    const queue = 'messages';
    let rabbitResult;
    await channel.assertQueue(queue, {durable: false});
    
    await channel.consume(queue, (msg)=>{
        console.log(msg.content.toString());
        rabbitResult = JSON.parse(msg.content.toString());
        console.log(rabbitResult);
    });
    await channel.close();
    await connection.close();

}

test();