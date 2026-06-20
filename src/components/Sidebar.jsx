export default function Sidebar() {
    const navButton =
      "w-full h-10 px-4 text-left rounded-xl hover:bg-sky-200 transition duration-300";
  
    return (
      <aside className="w-full lg:w-72 h-screen bg-white rounded-3xl p-5 shadow-sm">
  
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-8">
          Notez
        </h1>
  
        {/* New Note Button */}
        <button
          className="
            w-full
            h-12
            rounded-xl
            bg-[#4c8cfb]
            text-white
            font-medium
            shadow-md
            hover:bg-[#4384f8]
            transition-colors
            mb-6
          "
        >
          + New Note
        </button>
  
        {/* Navigation */}
        <div className="space-y-2">
          <button className={navButton}>Home</button>
  
          <button className={navButton}>
            All Notes
          </button>
  
          <button className={navButton}>
            Favorites
          </button>
  
          <button className={navButton}>
            Shared with Me
          </button>
  
          <button className={navButton}>
            Trash
          </button>
        </div>
  
      </aside>
    );
  }