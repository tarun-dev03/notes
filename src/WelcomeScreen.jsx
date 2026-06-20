import React from "react";

function WelcomeScreen() {
  return (
    <div className="relative w-full h-screen bg-slate-50">

      {/* Banner */}
      <div className="relative w-full h-[40%] overflow-hidden rounded-b-[40px] bg-gradient-to-r from-[#0F172A] via-[#312E81] to-[#581C87]">

        {/* Glow Blob 1 */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

        {/* Glow Blob 2 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        {/* Glow Blob 3 */}
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

        {/* Welcome Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            NoteFlow
          </h1>

          <p className="mt-3 text-xl text-white/70">
            Your thoughts, beautifully organized.
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative -mt-24 flex justify-center px-6">
        <div
          className="
            w-full
            max-w-xl
            p-10
            rounded-[35px]
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            shadow-[0_20px_50px_rgba(15,23,42,0.15)]
          "
        >
          <h2 className="text-4xl font-bold text-center text-slate-800">
            Welcome Back
          </h2>

          <p className="mt-3 text-center text-slate-500 text-lg">
            Sign in to continue
          </p>

          <div className="mt-10 space-y-6">

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-white
                border
                border-slate-200
                outline-none
                transition-all
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
                placeholder:text-slate-400
              "
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-white
                border
                border-slate-200
                outline-none
                transition-all
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
                placeholder:text-slate-400
              "
            />

            <button
              className="
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-[#312E81]
                to-[#581C87]
                text-white
                text-lg
                font-semibold
                shadow-lg
                hover:scale-[1.02]
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Login
            </button>

            <button
              className="
                w-full
                py-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                text-slate-700
                font-medium
                hover:bg-slate-50
                transition-all
                duration-300
              "
            >
              Continue with Google
            </button>

            <div className="text-center pt-2">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot Password?
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default WelcomeScreen;