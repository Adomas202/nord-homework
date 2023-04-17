import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { logOut } from "../../store/auth/auth.actions";
import { LogoIcon } from "../Icons/Icons";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          {LogoIcon}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Servers App
          </span>
        </a>
        <Button
          text="Logout"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => {
            dispatch(logOut());
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
