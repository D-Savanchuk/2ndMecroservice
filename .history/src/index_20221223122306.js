const amqp = require("amqplib");

var channel, connection;
connectQueue()  // call the connect function

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json());
app.listen(PORT, () => console.log("Server running at port " + PORT));

async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://rmuser:rmpassword@localhost:");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("test-queue")
        
        channel.consume("test-queue", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}