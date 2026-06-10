import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleRegisterSuccess = () => {
    setActiveTab("login");
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-5xl! gap-6 rounded-2xl p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <AlertDialogTitle className="text-2xl font-bold">
            {activeTab === "login" ? "Welcome back" : "Create an account"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {activeTab === "login"
              ? "Login to your CricPitch account to manage and book pitches"
              : "Sign up to start booking pitches near you"}
          </AlertDialogDescription>
        </div>

        <div className="bg-muted grid grid-cols-2 rounded-xl p-1">
          <Button
            variant={activeTab === "login" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("login")}
            className="rounded-lg text-xs font-semibold"
          >
            Login
          </Button>
          <Button
            variant={activeTab === "register" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("register")}
            className="rounded-lg text-xs font-semibold"
          >
            Sign Up
          </Button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm onSuccess={handleRegisterSuccess} />
          )}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Back to Pitches
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
