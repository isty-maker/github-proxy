// api/index.js
import fetch from "node-fetch";

/**
 * Этот серверless-обработчик читает файлы с GitHub (через raw URL)
 * и возвращает их содержимое в виде обычного текста.
 */
export default async function handler(request, response) {
  try {
    // URL запроса, например /core/views.py
    const path = request.url.replace(/^\/+/, "");
    if (!path) {
      return response.status(400).send("Укажи путь к файлу, например /core/views.py");
    }

    // Формируем ссылку на raw GitHub
    const GITHUB_USER = "isty-maker";
    const REPO_NAME = "mini-crm-realty";
    const BRANCH = "main";
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH}/${path}`;
