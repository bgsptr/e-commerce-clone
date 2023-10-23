import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants/index";

const Nav = () => {
  return (
    <header
      className="padding-x py-8 
    absolute z-10 w-full"
    >
      <nav
        className="flex justify-between 
        items-center max-container"
      >
        <a href="/">
          <img src={headerLogo} alt="logo" width={130} height={29} />
        </a>
        <ul
          className="flex flex-1 justify-center 
            gap-16 max-lg:hidden"
        >
          {navLinks.map((navLink) => {
            return (
              <li key={navLink.label}>
                <a
                  href={navLink.href}
                  className="font-
                            montserrat leading-normal text-larger 
                            text-slate-gray"
                >
                  {navLink.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="Hamburger" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
