import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Welcome to MERN Advanced Auth API at :  ${process.env.CLIENT_URL}`);
});


app.use(cors());

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(express.json()); // allows us to parse incoming requests from req.body

app.use("/api/auth", authRoutes);


connectDb();

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;

