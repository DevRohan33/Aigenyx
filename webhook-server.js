import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/webhook-test/e9ce502d-cb24-49b8-be18-96c2daf41b7f", (req, res) => {
  console.log("Received from chatbot:", req.body);
  res.json({ reply: `Echo: ${req.body.message}` });
});

app.listen(5678, () => {
  console.log("Webhook server running at http://localhost:5678");
});
