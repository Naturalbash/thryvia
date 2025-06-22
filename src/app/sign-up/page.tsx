import SignUp from "@/components/sign-up/sign-up";
import { Metadata } from "next";
import "../dashboard/thryvia.css";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
