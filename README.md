# Giovane Souza - Full Stack Developer Portfolio

This is the source code for my personal portfolio website, showcasing my skills, projects, and professional experience as a Full Stack Developer. The project is built with modern web technologies and features a clean, responsive design.

## Live Demo

You can view the live version of my portfolio here: [http://devbolsoni.com.br//](http://devbolsoni.com.br/)

## Technologies Used

This project was built using the following technologies:

- **[Next.js](https://nextjs.org/)**: A React framework for building server-side rendered and statically generated web applications.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[next-intl](https://next-intl-docs.vercel.app/)**: A library for internationalization in Next.js.
- **[React Icons](https://react-icons.github.io/react-icons/)**: A library of popular icon packs for React.

## AI Chatbot

The portfolio has a floating assistant that answers questions about my experience, skills and projects. It runs **entirely in the browser** using Chrome's built-in [Prompt API](https://developer.chrome.com/docs/ai/prompt-api) (Gemini Nano), so there is no backend and no API key.

- **Context:** `app/botData/systemPrompt.txt` (behavior) + `public/llms.txt` (portfolio data, also served at `/llms.txt`). Edit these files to change what the bot knows.
- **Theme and texts:** `app/botData/chatbot-config.json` and `app/botData/avatar.webp`.
- **Code:** UI in `app/components/chatbot/`, Prompt API logic in `lib/chatbot/`.
- **Requirements:** Chrome on desktop with the Prompt API available, and a device able to run the local model (the model is downloaded on first use). On any other browser or device the widget is **hidden**, so visitors never see a broken feature.
- **Languages:** Portuguese is not officially supported by the Prompt API yet (en, es, ja, de, fr are), so answers in Portuguese may vary in quality.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/portfolio.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd portfolio
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code using ESLint.
