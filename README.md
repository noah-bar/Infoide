# Infoïde

**Infoïde** is a lightweight Node.js application that fetches recent news alerts, classifies them using a local LLM (via [Ollama](https://ollama.com)), and stores them in a MySQL database.

## Features

- 🔎 Fetches real-time news from NewsAPI
- 🧠 Automatically classifies each alert using a local LLM (e.g. `phi3:mini`)
- 🗂 Categorizes news with a consistent set of tags
- 📊 Assigns an importance score to each alert (from 1 to 5)
- 💾 Avoids duplicates based on a hashed external ID
- 🧼 Handles LLM response errors and sanitizes JSON output

## Tech Stack

- **Node.js** + **TypeScript**
- **Prisma ORM** (MySQL)
- **Ollama** (local LLM inference)
- **NewsAPI** (news source)

## Setup

### 1. Clone the project

```bash
git clone https://github.com/yourusername/infoide.git
cd infoide
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set environment variables
Create a .env file with the following values:
```bash
DATABASE_URL="mysql://user:password@localhost:3306/infoide"
NEWS_API_KEY="your_api_key"
OLLAMA_HOST="http://localhost:11434"
```
### 4. Run migrations
```bash
npx prisma migrate dev

```
## Usage
Start the app:

```bash
npm run dev
```
This will:
- Fetch the latest alerts
- Check if each one already exists
- If not, classify it and store it in the database