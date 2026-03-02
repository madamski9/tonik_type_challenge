'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from '@/lib/cookies';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const userCookie = getCookie('user');
      if (userCookie) {
        setUser(JSON.parse(userCookie));
      } else {
        setUser(null);
      }
    };

    checkUser();
    const interval = setInterval(checkUser, 300);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    deleteCookie('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          <Link href="/" className="text-xl font-bold">
            Type Challenge
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Hello, <span className="font-semibold">{user.username}</span>
              </span>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
