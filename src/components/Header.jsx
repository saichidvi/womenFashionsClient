import { Link } from "react-router-dom";

const Header = () => {
  const currentPageURL = window.location.href;
  const isCart = currentPageURL.includes("cart");
  const isAbout = currentPageURL.includes("about");

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 md:px-10">
        <h1 className="font-bold text-lg  sm:text-2xl flex flex-wrap">
          <span className="text-slate-500">Womens </span>
          <span className="text-slate-700">Fashion</span>
        </h1>
        <div>
          <ul className="flex gap-4 text-xs md:text-lg">
            <li
              className={`text-slate-700 hover:underline hover:cursor-pointer ${
                isCart || isAbout ? "" : "underline"
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`text-slate-700 hover:underline hover:cursor-pointer ${
                isAbout ? "underline" : ""
              }`}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`text-slate-700 hover:underline hover:cursor-pointer ${
                isCart ? "underline" : ""
              }`}
            >
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
