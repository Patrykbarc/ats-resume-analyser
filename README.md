# ATS Resume Analyzer

An intelligent web application that analyzes resumes for compatibility with Applicant Tracking Systems (ATS). Upload your CV and get instant feedback on how well it will perform in automated screening systems.

🚀 **Live Demo**: [https://ats-resume-analyser.netlify.app/](https://ats-resume-analyser.netlify.app/)

## Features

- 📄 PDF resume parsing and analysis
- 🤖 AI-powered evaluation using OpenAI
- 📊 Detailed ATS compatibility scoring
- 💡 Actionable recommendations for improvement

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Axios
- Shadcn UI

### Backend
- Node.js
- Express
- TypeScript
- OpenAI API
- Multer (file upload)

### Monorepo
- pnpm workspaces
- Shared packages for types, schemas, and PDF parsing
- Biome for linting

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (v8 or higher)
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resume-analizer
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

#### API Configuration

Create a `.env` file in `apps/api/` directory:

```bash
cd apps/api
cp .env.template .env
```

Edit `apps/api/.env` and configure the following variables:

```env
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Frontend URL for CORS (optional, defaults to http://localhost:5173)
FRONTEND_URL=http://localhost:5173

# Server port (optional, defaults to 8080)
PORT=8080

# Node environment (optional, defaults to development)
NODE_ENV=development
```

#### Web Configuration

Create a `.env` file in `apps/web/` directory:

```bash
cd apps/web
cp .env.template .env
```

Edit `apps/web/.env` and configure the following variables:

```env
# API URL (required)
VITE_API_URL=http://localhost:8080
```

### 4. Running the Application

#### Development Mode

Run both frontend and backend simultaneously from root directory:

```bash
pnpm dev
```

Or run them separately:

```bash
# Terminal 1 - Run API server
pnpm dev:api

# Terminal 2 - Run web application
pnpm dev:web
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080

#### Production Build

```bash
pnpm build
```

## Project Structure

```
resume-analizer/
├── apps/
│   ├── api/                 # Backend Express server
│   │   ├── src/
│   │   │   ├── config/      # Configuration
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── middleware/  # Express middleware
│   │   │   └── prompt/      # AI prompts
│   │   │   ├── routes/      # API routes
│   │   └── package.json
│   └── web/                 # Frontend React application
│       ├── src/
│       │   ├── components/  # React components
│       │   └── lib/         # Utilities
│       │   ├── services/    # API services
│       └── package.json
├── packages/
│   ├── pdf-parse/          # Custom PDF parsing package
│   ├── schemas/            # Shared Zod schemas
│   └── types/              # Shared TypeScript types
└── package.json
```

## Available Scripts

- `pnpm dev` - Run both frontend and backend in development mode
- `pnpm dev:api` - Run only the API server
- `pnpm dev:web` - Run only the web application
- `pnpm build` - Build all packages and applications
- `pnpm lint` - Run Biome linter

## API Endpoints

### `POST /api/analyze`

Analyzes a resume file for ATS compatibility.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (PDF file)

**Response:**
```json
{
  "score": 85,
  "analysis": "Detailed analysis...",
  "recommendations": [
    "Add more keywords",
    "Use standard section headings"
  ]
}
```

## How It Works

1. **Upload**: User uploads a PDF resume through the web interface
2. **Parse**: The PDF is parsed to extract text content
3. **Analyze**: Content is sent to OpenAI API for ATS compatibility analysis
4. **Report**: User receives a detailed report with:
   - ATS compatibility score
   - Strengths and weaknesses
   - Actionable recommendations
   - Keyword optimization suggestions

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change PORT in apps/api/.env
PORT=3000
```

**CORS errors:**
```bash
# Ensure FRONTEND_URL in apps/api/.env matches your frontend URL
FRONTEND_URL=http://localhost:5173
```

**OpenAI API errors:**
- Verify your API key is valid
- Check your OpenAI account has sufficient credits
- Ensure API key has proper permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using React, Express, and OpenAI