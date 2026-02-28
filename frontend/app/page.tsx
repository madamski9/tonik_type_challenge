import Container from '@/components/Container';
import Link from 'next/link';

export default function Home() {
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
          <Link
            href="/game"
            className="btn px-15"
          >
            Play as guest
          </Link>
          <Link
            href="/login"
            className='btn px-20'
          >
            Login
          </Link>
        </div>
      </div>
    </Container>
  );
}
