"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
