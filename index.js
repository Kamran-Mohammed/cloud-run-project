import express from "express";
import { Datastore } from "@google-cloud/datastore";

const app = express();
app.use(express.json());

const datastore = new Datastore();

app.get("/", (req, res) => {
  console.log("Home route hit");
  //   res.send("Cloud Run app is running");
  res.send("Hello World");
});

app.post("/store", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const key = datastore.key("Message");

    await datastore.save({
      key,
      data: {
        text: req.body.text || "empty",
        createdAt: new Date(),
      },
    });

    console.log("Saved to Datastore");
    res.status(200).send("Data stored");
  } catch (err) {
    console.error("Error storing data", err);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
