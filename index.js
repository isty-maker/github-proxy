import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const GITHUB_USER = "isty-maker";
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
    const contentType = response.headers.get("content-type") || "text/plain";
    const text = await response.text();
    res.set("Content-Type", contentType.includes("text") ? contentType : "text/plain");
    res.send(text);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).send("Ошибка сервера");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy запущен на ${PORT}`));
export default app;
