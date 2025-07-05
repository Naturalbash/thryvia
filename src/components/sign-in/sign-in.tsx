import { login } from "@/server/auth.action";
import Logo from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-btn";

export default function SignIn() {
  return (
    <div>
      <main className="bg-[#f0f2f5] flex flex-col justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <Logo 
            src="/logo.png" 
            alt="Thyryvia Logo" 
            width={140} 
            height={70} 
            className="mb-4 w-24 h-12 sm:w-32 sm:h-16 md:w-36 md:h-20" 
          />
          <div className="bg-[#fff] p-6 sm:p-8 rounded-xl shadow-lg w-full">
            <h2 className="text-xl sm:text-2xl tracking-wide text-slate-700 font-bold text-center mb-6 sm:mb-8">
              Login to Your Account
            </h2>
            <form action={login}>
              <div className="mb-4">
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username or Email:
                </label>
                <input
                  type="text"
                  id="user"
                  name="email"
                  required
                  placeholder="Enter username or email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div className="mb-6 sm:mb-8">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <SignInButton />
            </form>
            <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base font-semibold">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-red-600 hover:text-slate-800 hover:underline transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
