import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/pitches", label: "Pitches" },
  { to: "/bookings", label: "My Bookings" },
];

const Header = () => {
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-foreground"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
                  <span className="nav-underline absolute bottom-0 left-0 h-[2px] bg-primary" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {isLoggedIn ? (
            <button className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/10">
              <User className="h-4 w-4" />
              Profile
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
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
