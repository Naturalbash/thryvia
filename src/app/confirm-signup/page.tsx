"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ConfirmSignupPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Get email from localStorage or URL params
  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Fallback to URL params if localStorage is empty
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get("email");
      if (emailParam) {
        setEmail(emailParam);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link 
          href="/sign-in"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Sign In
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>

          <div className="mb-6">
            <Image
              src="/thryvia-logo.png"
              alt="Thryvia Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Check Your Email
          </h1>
          
          <p className="text-slate-600 mb-6 leading-relaxed">
            We've sent a verification link to
          </p>
          
          <p className="text-slate-800 font-medium mb-6 bg-slate-50 px-4 py-2 rounded-lg">
            {email}
          </p>

          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Click the link in your email to verify your account and start your journey with Thryvia.
          </p>

          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Mail className="text-orange-600" size={24} />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.open('https://mail.google.com', '_blank')}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Open Gmail
            </button>
            
            <button
              onClick={() => window.open('https://outlook.live.com', '_blank')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Open Outlook
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-4">
              Didn't receive the email?
            </p>
            <div className="space-y-2 text-xs text-slate-500">
              <p>• Check your spam folder</p>
              <p>• Make sure you entered the correct email address</p>
              <p>• Wait a few minutes for the email to arrive</p>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/sign-up"
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                Try signing up again
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-slate-500">
            © 2025 Thryvia. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
