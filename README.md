# Creator IT Festival

## Technologies

**Next.js & React**: Fast, responsive, and interactive UI.

**Tailwind CSS**: Utility-first CSS framework for styling.

**Express**: Robust backend development.

**TypeScript**: Type-safe, maintainable code.

**Telegram API**: Real-time communication and notifications.

![Project Image](/public/project.png)

## Description

This project was developed during the Creator IT Festival in Ukraine. It is a modern web application built with Next.js and React for the frontend, Express for the backend, TypeScript for type safety, and Telegram API for real-time communication. The project includes a lottery system for distributing certificates among users.

## Environment Variables

### Database Configuration

DATABASE_URL=`mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority&appName=Cluster0`

### Base API URL

NEXT_PUBLIC_BASE_API_URL=`<your-base-api-url>`

### Additional Configuration

NEXT_PUBLIC_WHEEL_PAGE_KEY=`<your-wheel-page-key>`

NEXT_PUBLIC_TARGET_HOUR=`<your-target-hour>`

### Telegram Bot Configuration

TELEGRAM_BOT_API_URL=`<your-telegram-bot-api-url>`

## Getting Started

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/creator-it-festival
   ```
2. **Install dependencies**:

   ```
    npm install
    #or
    yarn install
    #or
    pnpm install
    #or
    bun install
   ```

3. **Set up environment variables: Create a .env file in the root of your project and add the above environment variables.**

4. **Run the development server:**

   ```
   npm run dev
   #or
   yarn dev
   #or
   pnpm dev
   #or
   bun dev
   ```
