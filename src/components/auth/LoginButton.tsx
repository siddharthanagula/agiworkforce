import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Mail, Github } from "lucide-react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login'
      }
    });
  };

  if (isLoading) {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-2 text-lg border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={handleLogin}
      >
        <Mail className="h-5 w-5" />
        Sign in with Email
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-2 text-lg border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={handleLogin}
      >
        <Github className="h-5 w-5" />
        Sign in with GitHub
      </Button>
      
      <RainbowButton
        className="w-full text-lg"
        onClick={handleLogin}
      >
        Get Started
      </RainbowButton>
    </div>
  );
};

export default LoginButton;
