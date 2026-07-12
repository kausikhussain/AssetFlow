import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import api from '../../services/api';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/signup', {
        email,
        password,
        full_name: fullName,
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-surface border-border">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border border-primary flex items-center justify-center mb-4">
             <span className="text-primary font-bold">AF</span>
          </div>
          <CardTitle className="text-2xl text-text">AssetFlow - Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {error && <div className="text-sm text-error text-center">{error}</div>}

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-muted hover:text-primary transition-colors">Already have an account? Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
