export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center bg-[#111111] text-gray-100">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 purple-glow">
            404 - Page Not Found
          </h1>
          <p className="max-w-lg mb-8 text-xl text-gray-400">
            The page you are looking for does not exist.
          </p>
          <a href="/" className="mt-8 px-8 py-3 bg-gradient-to-r from-[#8257E5] to-[#9466FF] rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            Go back to Home
          </a>
        </div>
      </body>
    </html>
  );
}
