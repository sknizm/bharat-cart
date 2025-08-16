export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-500 text-sm">
            Made with <span className="text-pink-500">♥</span> by{" "}
            <a 
              href="https://2cdsite.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:underline hover:text-gray-900 font-medium transition-colors duration-200"
            >
              2cd site
            </a>
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}