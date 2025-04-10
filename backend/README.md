
# Vignan Mid Exam Central - Backend

This directory contains the backend Express.js application for the Vignan Mid Exam Central platform.

## Features

- User authentication
- File uploads (PDF/PPT)
- MongoDB database integration
- Group management
- Assessment submission handling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB:
Make sure MongoDB is running on your system or set up MongoDB Compass with the connection string `mongodb://localhost:27017/vignanExams`.

3. Run the development server:
```bash
npm run dev
```

4. Start for production:
```bash
npm start
```

## API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/submissions/upload` - File uploads
- `GET /api/assessments/class/:className` - Get assessments by class
- `GET /api/submissions/assessment/:assessmentId` - Get submissions for an assessment

## Database Collections

- Users
- Groups
- Assessments
- Submissions
