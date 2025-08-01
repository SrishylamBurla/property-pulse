import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties" className="hover:underline">Properties</Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>
        
        {/* Copyright */}
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
