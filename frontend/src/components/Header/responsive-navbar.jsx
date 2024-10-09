import { BiMenu } from "react-icons/bi";
import logo from "../../assets/logo.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { navLinks } from './nav-link';
import { NavLink } from "react-router-dom";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <BiMenu className="w-6 h-6 cursor-pointer" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-center items-center w-full">
            <img src={logo} alt="Logo" />
          </SheetTitle>
          <SheetDescription>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <SheetClose asChild>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                          : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                      }
                    >
                      <div className="flex items-center gap-2">
                        <link.icon className="w-6 h-6" />
                        {link.display}
                      </div>
                    </NavLink>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
