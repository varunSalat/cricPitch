import { NavLink } from "react-router-dom";
import { NavUser } from "./NavUser";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/pitches", label: "Pitches" },
];

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-border/70 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <NavLink
          to="/"
          className="text-foreground flex items-center gap-3 text-lg font-semibold tracking-tight"
        >
          <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
            CP
          </div>
          <span>CricPitch</span>
        </NavLink>

        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center transition-colors duration-200 ${
                      isActive
                        ? "active-link text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                  <span className="nav-underline bg-primary absolute bottom-0 left-0 h-[2px]" />
                </NavLink>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/bookings"
                  end={true}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center transition-colors duration-200 ${
                      isActive
                        ? "active-link text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  My Bookings
                  <span className="nav-underline bg-primary absolute bottom-0 left-0 h-[2px]" />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div>
          {isAuthenticated ? (
            <NavUser />
          ) : (
            <NavLink
              to="/login"
              className="border-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-full border px-4 py-2 text-sm font-semibold transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
