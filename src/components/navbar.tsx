import Image from "next/image";
import logo from "@/assets/logo.png";
import NavLinks from "./nav-links";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-3 md:py-6 flex items-center gap-6">
      {/* logo */}
      <Image alt="logo" src={logo} width={100} />

      {/* links */}
      <div className="hidden md:block">
        <NavLinks />
      </div>

      {/* user / login / register */}
      <div className="ml-auto flex items-center gap-12">
        <Link href={`/signin`}>
          <Button className="hidden md:block text-foreground font-bold hover:text-neutral-100 transition duration-300 bg-gradient-green--invert">
            Login
          </Button>
        </Link>
        <Button className="md:hidden text-foreground font-bold hover:text-neutral-100 transition duration-300 bg-gradient-green--invert">
          <Menu />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
