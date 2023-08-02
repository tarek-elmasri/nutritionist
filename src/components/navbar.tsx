import Image from "next/image";
import logo from "@/assets/logo.png";
import NavLinks from "./nav-links";

const Navbar = () => {
  return (
    <nav className="bg-lightgreen/40">
      <div className="w-full px-24 p-6  flex justify-start items-center gap-12">
        {/* logo */}
        <Image alt="logo" src={logo} width={120} />

        {/* links */}
        <ul className="flex flex-1 items-center gap-6">
          <NavLinks />
        </ul>

        {/* user / login / register */}
        <div className="flex items-center gap-12">
          <button>login</button>
          <button>signup</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
