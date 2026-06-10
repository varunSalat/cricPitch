import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { privateFetch } from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";

const RootLayout = () => {
  const { isAuthenticated, setUser, logout } = useAuth();

  const { data, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => privateFetch("/users/me"),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setUser(data.data.data);
    }
  }, [data, setUser]);

  useEffect(() => {
    const err = error as { status?: number } | null;
    if (err?.status === 401) {
      logout();
    }
  }, [error, logout]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
