'use client';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <LoginForm/>
    </div>
  );
}