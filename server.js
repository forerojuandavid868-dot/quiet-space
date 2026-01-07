import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/api/posts", async (req, res) => {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: true });

  res.json(data);
});

app.post("/api/post", async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).end();

  await supabase.from("posts").insert({ text });
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Quiet Space running 🌱");
});
