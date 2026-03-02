'use client'
import Container from '@/components/layout/Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from '@/lib/cookies';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

  const playAsGuest = () => {
    const randomNick = 'Guest_' + Math.random().toString(36).substring(2, 10);
    const guestUser = {
      id: null,
      username: randomNick,
      isGuest: true
    };
    setCookie('user', JSON.stringify(guestUser), 1);
    router.push('/game');
  };

  return (
    <Container>
      <div className="text-center mb-12 p-4">
        <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent">
          Welcome to type Challenge
        </div>
      </div>
      <div className="rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
        <div className="flex gap-4 justify-center">
          {user ? (
            <Link
              href="/game"
              className="btn btn-primary px-20"
            >
              Play
            </Link>
          ) : (
            <>
              <button
                onClick={playAsGuest}
                className="btn px-15"
              >
                Play as guest
              </button>
              <Link
                href="/login"
                className='btn px-20'
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
