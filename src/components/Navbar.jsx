export default function Navbar() {
    return (
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        
        {/* Search Bar */}
        <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
          <span className="mr-3 text-gray-400 text-lg">
            🔍
          </span>
  
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full outline-none text-gray-700"
          />
        </div>
  
        {/* Right Side */}
        <div className="flex items-center gap-4 ml-6">
  
          <button className="text-xl">
            🔔
          </button>
  
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            R
          </div>
  
        </div>
  
      </div>
    );
  }