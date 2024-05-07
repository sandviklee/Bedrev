import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Dropdown.module.css";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";

const Dropdown = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  /**
   * Retrieves the auth token to
   * check if a user is logged in.
   */
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth-token"),
  );
  const location = useLocation();

  useEffect(() => {
    setAuthToken(localStorage.getItem("auth-token"));
  }, [location.state]);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={toggleOpen}>
      <DropdownMenu.Trigger asChild>
        <button onClick={toggleOpen}>
          <Hamburger toggled={isOpen} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          <DropdownMenu.Item className="flex flex-row w-full justify-center py-1">
            <Link to="/">Hjem</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex flex-row w-full justify-center py-1">
            <Link to="/sok-bedrifter">Søk bedrifter</Link>
          </DropdownMenu.Item>
          {authToken == null ? (
            <DropdownMenu.Item className="flex flex-row w-full justify-center py-1">
              <Link to="/logg-inn">Logg inn</Link>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className="flex flex-row w-full justify-center py-1">
              <Link
                onClick={() => localStorage.removeItem("auth-token")}
                to="/"
              >
                Logg Ut
              </Link>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
