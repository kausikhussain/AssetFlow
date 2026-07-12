import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-surface border-border">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border border-primary flex items-center justify-center mb-4">
             <span className="text-primary font-bold">AF</span>
          </div>
          <CardTitle className="text-2xl text-text">AssetFlow - login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <a href="#" className="text-sm text-primary hover:underline">Forgot password</a>
              </div>
            </div>
            
            {error && <div className="text-sm text-error text-center">{error}</div>}

            <div className="border-t border-border pt-4 mt-2">
              <p className="text-sm text-muted mb-2">New here?</p>
              <div className="p-3 bg-background border border-border rounded-md text-sm text-muted mb-4">
                Sign up creates an employee account. Admin roles are assigned later.
              </div>
              <Button type="submit" className="w-full" variant="outline">
                Login
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-sm text-primary hover:underline">Create Account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
