const Score = require("./models/Score");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
//my ada update
app.post("/api/game/save", async (req, res) => {
  const { name, moves } = req.body;

  try {
    const score = new Score({ name, moves });
    await score.save();

    res.json({ message: "Score saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/game/scores/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const scores = await Score.find({ name }).sort({ date: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//my ada update


// CONNECT DATABASE
mongoose.connect("mongodb+srv://adarsh:1234@cluster0.h6xfoz4.mongodb.net/cognitive-ai?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB ERROR:", err));

// REGISTER API
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// LOGIN API (REAL)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      token: "real-token",
      user: {
        name: user.name,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// HOME
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});