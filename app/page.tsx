import Container from '@/components/Container';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <div className="text-center mb-12 p-4">
        <div className="text-5xl font-bold mb-4 bg-blue-500 bg-clip-text text-transparent">
          Welcome to type Challenge
        </div>
      </div>
      <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
        <div className="flex gap-4 justify-center">
          <Link
            href="/play"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Play
          </Link>
        </div>
      </div>
    </Container>
  );
}
