import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "./LogoutButton";
import { Mail } from "lucide-react";

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.picture} alt={user.name || user.email} />
            <AvatarFallback>
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user.name || 'User'}</h3>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
        </div>

        <div className="pt-4">
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
