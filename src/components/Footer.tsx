import Link from "next/link";
import { MaxWidthWrapper } from "@/components";

const Footer = () => (
  <footer className="relative h-20 bg-white">
    <MaxWidthWrapper>
      <div className="flex h-full flex-col items-center justify-center space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex space-x-8">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Terms
            </Link>

            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  </footer>
);

export default Footer;
