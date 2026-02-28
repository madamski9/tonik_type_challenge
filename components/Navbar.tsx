'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold hover:text-blue-400">
            Type Challenge
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
