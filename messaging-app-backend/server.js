import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
//App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url =
  "mongodb+srv://admin:Mongodb%40124@cluster0.zr2k2yx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const pusher = new Pusher({
  appId: "1826279",
  key: "d404f8161f5a4ac679a6",
  secret: "c66cc18695d05a194310",
  cluster: "eu",
  useTLS: true,
});
//Middleware
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url, {});
//API Endpoints

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));

app.post("/messages/new", async (req, res) => {
  try {
    const dbMessage = req.body;
    const message = await Messages.create(dbMessage);
    res.status(201).send(message);
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).send(err);
  }
});

app.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send(err);
  }
});
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
