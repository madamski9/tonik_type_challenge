'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Type Challenge
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
