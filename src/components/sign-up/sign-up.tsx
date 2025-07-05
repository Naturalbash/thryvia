"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import Logo from "next/image";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "mentor" | "worker" | "";
}

export default function SignUp() {
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!formData.role) {
      setRoleError(true);
      hasError = true;
    } else {
      setRoleError(false);
    }

    if (hasError) return;
  };

  return (
    <div className="flex flex-col min-h-screen h-screen w-full items-center justify-center bg-gray-100 p-0 m-0">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <Logo
          src="/logo.png"
          alt="Thyryvia Logo"
          width={140}
          height={70}
          className="mb-4 w-24 h-12 sm:w-32 sm:h-16 md:w-36 md:h-20"
        />
        <div className="w-full bg-white px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg text-slate-800 flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-4 text-slate-800 tracking-wide">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1 justify-center">
            <div className="flex flex-col sm:flex-row sm:gap-2 gap-2">
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-2 gap-2">
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                  placeholder="Create a password"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder:text-gray-400 text-xs sm:text-sm"
                  placeholder="Confirm your password"
                />
                {passwordError && (
                  <p className="text-xs text-red-600 mt-1">
                    Passwords do not match.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: e.target.value as "mentor" | "worker",
                  }))
                }
                required
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-xs sm:text-sm bg-white"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="mentor">Mentor</option>
                <option value="worker">Worker</option>
              </select>

              {roleError && (
                <p className="text-xs text-red-600 mt-1">
                  Please select a role before continuing.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-2.5 bg-slate-700 text-white font-semibold border-none rounded-lg text-xs sm:text-sm cursor-pointer hover:bg-slate-600 transition-colors duration-200 mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-2 sm:mt-4 text-center text-xs sm:text-sm font-semibold">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-red-600 hover:text-slate-800 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
