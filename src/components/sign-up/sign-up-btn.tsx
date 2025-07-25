"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full flex justify-center items-center py-2 bg-slate-700 text-white font-semibold border-none rounded-sm text-md cursor-pointer hover:bg-slate-600 transition"
    >
      {pending ? <Loader className="animate-spin" /> : "Create Account"}
    </Button>
  );
}
