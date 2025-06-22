import SignIn from "@/components/sign-in/sign-in";
import { Metadata } from "next";
import "../dashboard/thryvia.css";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Page() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
