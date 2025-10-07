// index.js — Express proxy for GitHub (Vercel-ready)
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const GITHUB_USER = "isty-maker"; // твой логин GitHub
const REPO_NAME = "mini-crm-realty";
const BRANCH = "main";

app.get("/*", async (req, res) => {
  try {
    const path = req.params[0];
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH}/${path}`;
    const response = await fetch(rawUrl);

    if (!response.ok) {
      return res.status(response.status).send(`Ошибка: ${response.statusText}`);
    }

    const text = await response.text();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(text);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).send("Ошибка сервера");
  }
});

// ❌ app.listen(...) убираем полностью!
// ✅ Вместо этого экспортируем как default (для Vercel)
export default app;
