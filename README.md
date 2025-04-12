# Tutr - Modern Tutoring Platform

## Overview
Tutr is a modern web application that revolutionizes online tutoring by providing a streamlined platform for educators and learners. Think "Uber Eats meets Tutoring" - an intuitive platform that connects teachers with learning opportunities.

## Features

### Core Features
- 🎓 Interactive Teaching Interface
- 📝 Notes Upload Functionality 
- 🎥 Integrated Studio for Content Creation
- 🔍 Smart Search System
- 📱 Responsive Design with Mobile Support
- 🎨 Modern, Dark-themed UI
- 🔐 User Authentication System

### Technical Features
- Server-Side Rendering (SSR) Support
- React Router for Navigation
- TypeScript for Type Safety
- TailwindCSS for Styling
- Containerized with Docker
- Focus on Accessibility

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd tutr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build for Production

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

### Docker Deployment

Build and run using Docker:
```bash
docker build -t tutr .
docker run -p 3000:3000 tutr
```

## Project Structure

```
app/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, etc.)
├── layouts/        # Layout components
├── routes/         # Route components
├── styles/         # CSS styles
└── welcome/        # Welcome/Guest pages
```

## Technologies

- **Frontend Framework**: React
- **Router**: React Router
- **Styling**: TailwindCSS + Custom CSS
- **Type Checking**: TypeScript
- **State Management**: React Context
- **Build Tool**: Vite
- **Containerization**: Docker

## Development

### TypeScript

The project uses TypeScript for type safety. Run type checking with:
```bash
npm run typecheck
```

### Styling

The project uses a combination of TailwindCSS and custom CSS for styling. The dark theme is consistently applied throughout the application.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[License Type] - see the LICENSE.md file for details
