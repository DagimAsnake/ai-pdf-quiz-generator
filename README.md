# Interactive Learning Platform

A modern web application that transforms PDF content into interactive learning experiences, similar to Quizlet. Built with Next.js, TypeScript, and powered by Google's Gemini AI.

## Features

### 📚 Multiple Learning Modes

- **Quiz Mode**: Test your knowledge with AI-generated multiple-choice questions
- **Flashcards**: Review concepts with interactive flashcards
- **Match Game**: Reinforce learning by matching questions with answers

### 🤖 AI-Powered Content Generation

- Automatically generates questions from uploaded PDF documents
- Supports both single and multiple correct answer formats
- Provides detailed explanations for answers

### 📊 Progress Tracking

- Track your performance across different learning modes
- View detailed quiz results with correct/incorrect answers
- Monitor your study statistics

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini AI
- **State Management**: Zustand
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/DagimAsnake/ai-pdf-quiz-generator.git
cd your-repo-name
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Add your Google Gemini API key to `.env.local`:

```
GOOGLE_API_KEY=your_api_key_here
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload PDF**

   - Drop your PDF file or click to upload
   - Supports files up to 5MB

2. **Choose Learning Mode**

   - Select from Quiz, Flashcards, or Match game
   - Each mode offers a different way to interact with the content

3. **Track Progress**
   - View statistics for each learning mode
   - Review detailed quiz results
   - Track completion rates

## Features in Detail

### Quiz Mode

- Multiple choice questions with single or multiple correct answers
- Detailed explanations for each answer
- Comprehensive review of results with color-coded feedback

### Flashcards

- Interactive card flipping animation
- Question on front, answer on back
- Progress tracking through the deck

### Match Game

- Match questions with their corresponding answers
- Timer to track completion speed
- Interactive UI with immediate feedback

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.