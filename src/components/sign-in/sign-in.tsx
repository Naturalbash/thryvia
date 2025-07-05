import { login } from "@/server/auth.action";
import Logo from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-btn";

export default function SignIn() {
  return (
    <div>
      <main className="bg-[#f0f2f5] flex flex-col gap-6 sm:gap-8 text-slate-800 justify-center items-center min-h-screen p-4">
        <Logo src="/logo.png" alt="Thyryvia Logo" width={150} height={150} className="sm:w-[200px] sm:h-[200px]" />
        <div className="bg-[#fff] p-6 sm:p-8 rounded-sm shadow-md w-full max-w-sm sm:max-w-md">
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
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm sm:text-base"
              />
            </div>
            <SignInButton />
          </form>
          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-md font-semibold">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-red-600 hover:text-slate-800 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
