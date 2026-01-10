import { useState } from 'react';
import { ImageWithFallback } from './res/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onBackClick?: () => void;
  onRegisterClick?: () => void;
}

import { useAuth } from '../context/AuthContext';

export function LoginPage({ onBackClick, onRegisterClick }: LoginPageProps) {
  const { checkAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Handle login logic here
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      alert('Login successful!');
      await checkAuth();
      if (onBackClick) onBackClick();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1593950404789-b4f0c865fb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkJTIwc3RyZWV0JTIwdXJiYW58ZW58MXx8fHwxNzY3ODk0NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Skateboarding background"
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
      </div>

      {/* Back Button */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-neutral-400 hover:text-neutral-100 hover:cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      )}

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl mb-4 tracking-tight text-neutral-100">
            FAKIE
          </h1>
          <p className="text-xl text-neutral-400">
            Welcome back to the crew
          </p>
        </div>

        <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-sm backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-sm">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-neutral-100 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-neutral-100 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-neutral-100 text-black hover:bg-neutral-200 hover:cursor-pointer transition-colors rounded-sm tracking-wide"
            >
              LOGIN
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900/80 text-neutral-500">or</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-neutral-400">
              New to the crew?{' '}
              {onRegisterClick ? (
                <button
                  onClick={onRegisterClick}
                  className="text-neutral-100 hover:text-neutral-300 transition-colors underline underline-offset-4"
                >
                  Register
                </button>
              ) : (
                <a
                  href="#register"
                  className="text-neutral-100 hover:text-neutral-300 transition-colors underline underline-offset-4"
                >
                  Register
                </a>
              )}
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a
              href="#forgot-password"
              className="text-neutral-500 hover:text-neutral-400 transition-colors text-sm"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}