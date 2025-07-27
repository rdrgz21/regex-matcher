🧪 Regex Matcher
A lightweight, modern web app for creating, testing, and approving regex patterns against dynamic input text. Built with Next.js, React Context, and TypeScript.

✨ Features
🔍 Regex Previewing – Match patterns against text content in real-time.

📝 Create, Edit & Delete custom regex patterns.

✅ Approval Workflow – Approve regex patterns for extraction.

📄 Match Display – View extracted terms grouped by pattern.

💾 Persistence – Local state saved with localStorage.

🎨 Modern UI – Clean, minimal interface using CSS Modules.

🧪 Test Coverage – Unit tested with Vitest and React Testing Library.

🚀 Getting Started

1. Clone the repo
   bash
   Copy
   Edit
   git clone https://github.com/your-username/regex-matcher.git
   cd regex-matcher
2. Install dependencies
   bash
   Copy
   Edit
   npm install

# or

yarn install 3. Run locally
bash
Copy
Edit
npm run dev

# or

yarn dev
App will be available at http://localhost:3000

🧪 Running Tests
bash
Copy
Edit
npm run test

# or

yarn test
Includes unit tests for reducer logic, context, and UI components using:

Vitest

@testing-library/react

🏗️ Tech Stack
Next.js

React

TypeScript

React Context + useReducer

CSS Modules

Vitest

React Testing Library

📁 Project Structure
cpp
Copy
Edit
src/
├── components/ // UI components
├── context/ // Regex context & reducer
├── constants/ // Action types
├── hooks/ // Custom hooks
├── pages/ // Next.js pages
├── styles/ // CSS Modules
├── types/ // TypeScript types
├── utils/ // Utility functions (e.g., match extractor)

📄 License
MIT © rdrgz21
