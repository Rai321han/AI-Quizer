# AI Quizer

AI Quizer is an intelligent quiz platform that lets users generate quizzes using AI prompts, schedule or share them, and compete with others. The platform tracks scores, maintains leaderboards, and provides detailed user dashboards.

## 🌟 Features

### Quiz Generation

- AI-powered quiz generation from user prompts
- Customizable number of questions and options
- Generated Quiz can be edited.
- Support for both single and multiple-choice answers
- Save and share quizzes with others
- Quiz answers privacy.
- Schedule quizzes for future participation

### User Management

- Secure authentication with email verification
- Personal dashboard showing quiz history
- Track generated and attempted quizzes

### Quiz Participation

- Join quizzes through unique links
- Quiz attempt tracking
- Automatic scoring system
- View answers after submission (configurable)

## 📝 Environment Setup

### Frontend Configuration

Create a `.env` file in the frontend directory:

```sh
NEXT_PUBLIC_BASE_API=your_api_url
NEXT_PUBLIC_BASE_URL=your_frontend_url
```

### Backend Configuration

Create a .env file in the server directory and fill this variables:

```sh
GEMINI_API_KEY=gemini_api_key
BETTER_AUTH_SECRET=better_auth_api_key
DATABASE_URL=db_url
BETTER_AUTH_URL=your_backend_url
REDIS_ENDPOINT=redis_endpoint
REDIS_PASSWORD=redis_password
REDIS_PORT=redis_running_port
FRONTEND_URL=your_frontend_url
MJ_APIKEY_PUBLIC=mailjet_api_key
MJ_APIKEY_PRIVATE=mailjet_secret_key
```

🚀 Getting Started
Running the Frontend

```sh
cd frontend
npm install
npm run dev
```

Backend Package installation

```sh
cd server
npm install
```

Running the background job queue

```sh
cd server
npm run worker
```

Running the backend

```sh
cd server
npm run dev
```

## 📦 Project Structure

```sh
├── frontend/           # Next.js frontend application
│ ├── app/              # App router pages
│ ├── components/       # React components
│ ├── actions/          # Server actions
│ └── lib/              # Utilities and helpers
│
└── server/             # Express backend application
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── db/
│ ├──migrations/        # Database migrations
│
└── workers             # Background worker
```

## 🛠 Tech Stack

| Layers            | Techs                                        |
| ----------------- | -------------------------------------------- |
| Frontend          | NextJS, TypeScript, Tailwind CSS, Zustand    |
| Backend           | Node.js (Express), Langchain.js              |
| Database          | PostgreSQL                                   |
| AI Model          | Google Gemini 2.5 Flash for quiz generation. |
| Authentication    | Better-auth                                  |
| Background worker | BullMQ + Redis                               |
