import { login } from "@/server/auth.action";
import Logo from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-btn";

export default function SignIn() {
  return (
    <div>
      <main className="bg-[#f0f2f5] flex flex-col gap-8 text-slate-800 justify-center items-center h-[100vh]">
        <Logo src="/logo.png" alt="Thyryvia Logo" width={200} height={200} />
        <div className="bg-[#fff] p-8 rounded-sm shadow-md w-full max-w-md">
          <h2 className="text-2xl tracking-wide text-slate-700 font-bold  text-center mb-8">
            Login to Your Account
          </h2>
          <form action={login}>
            <div className="mb-4">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                Username or Email:
              </label>
              <input
                type="text"
                id="user"
                name="email"
                required
                placeholder="Enter username or email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <SignInButton />
          </form>
          <div className="mt-4 text-center text-md font-semibold">
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
