import { useSelector } from "react-redux";
import AuthenticationButton from "@/components/buttons/AuthenticationButton";
import UserMenu from "@/views/user-menu/UserMenu";
import { handleSignIn } from "@/utils/authenticate/handlers";
import { Link, useLocation } from "react-router-dom";
import NavigationButton from "@/components/buttons/NavigationButton";
import DashboardButton from "@/components/buttons/DashboardButton";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const currentPath = location.state?.address;
  const backgroundColor =
    location.pathname === "/" ? "bg-[#0000BA]" : "bg-[#293137]";

  return (
    <header>
      <nav
        className={`flex items-center justify-between h-16 ${backgroundColor}`}
      >
        <Link to="/">
          <h1 className="mx-3 font-figtree text-white text-3xl mini:hidden">
            Core City
          </h1>
        </Link>
        {isAuthenticated === null ? (
          ""
        ) : isAuthenticated ? (
          <UserMenu />
        ) : (
          <div className="flex">
            {currentPath === "guestMode" ? (
              <NavigationButton
                path={"/"}
                title="Back to Home"
                css="flex items-center justify-center px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-300 hover:to-cyan-300 font-medium text-[#0000BA]"
                ariaLabel="Server list view button"
              />
            ) : (
              <DashboardButton
                address="guestMode"
                text="Guest Mode"
                css="flex items-center justify-center px-3 py-2 rounded-md bg-gradient-to-r from-green-300 to-cyan-500 hover:from-blue-300 hover:to-cyan-300 font-medium text-[#0000BA]"
              />
            )}

            <AuthenticationButton
              handler={handleSignIn}
              title="Sign in"
              css="mx-3 w-28 mini:w-20 h-10 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-300 text-md font-medium text-[#0000BA]"
              ariaLabel="Sign in button"
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
