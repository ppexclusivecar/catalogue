'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminPannel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://server-psi-olive-46.vercel.app/api/login', { password });
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setError('');
    } catch {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Accès Administrateur</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Connexion
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Panel</h1>
      <div className="flex flex-col items-center gap-4">
        <Link href="/admin/ajouter" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/3 text-center">
          Ajouter
        </Link>
        <Link href="/admin/catalogue" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-1/3 text-center">
          Catalogue
        </Link>
        <Link href="/admin/archive" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 w-1/3 text-center">
          Archive
        </Link>
      </div>
    </div>
  );
}
