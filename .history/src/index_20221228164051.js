const amqp = require("amqplib");
const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://user:1QazxsW2@cluster0.oerzgcw.mongodb.net/?retryWrites=true&w=majority');

async function test(){
    try{
    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');    
    const channel = await connection.createChannel(); 
    await client.connect();
    const colls = await client.db().collection('stocks');
      
    const queue = 'messages';
    let rabbitResult;
    await channel.assertQueue(queue, {durable: false});
    
    await channel.consume(queue, async (msg)=>{
        colls.deleteMany({});
        console.log('CONSUME');
        console.log(msg.content.toString());
        rabbitResult = JSON.parse(msg.content.toString());
        await colls.insertMany(rabbitResult)
        console.log(rabbitResult);
        channel.ack(msg); 
    }); 

    }catch(err){
    console.log(err);
    }

}
test();