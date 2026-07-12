import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Activity, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { mockUsers } from '../../mock/auth.mock';
import heroImage from '../../assets/assetflow_hero.png';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleMockLogin = async (mockEmail: string) => {
    setError('');
    try {
      await login(mockEmail, 'mock_password');
      navigate('/dashboard');
    } catch (err) {
      setError('Mock login failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans overflow-hidden">
      {/* Left Panel: Branding & Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-between p-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AssetFlow abstract" 
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-primary/80 to-blue-900/90 mix-blend-multiply"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white mt-8">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl tracking-wider">AF</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">AssetFlow</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Enterprise <br />
            Asset Management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Reimagined.</span>
          </h1>
          <p className="text-lg text-indigo-100/90 max-w-md font-medium leading-relaxed">
            Streamline your workflow, optimize resource allocation, and gain unparalleled visibility into your organization's assets.
          </p>
        </div>

        <div className="relative z-10 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-transform hover:-translate-y-1 duration-300 shadow-xl">
              <ShieldCheck className="text-blue-200 mb-3" size={28} />
              <h3 className="font-semibold text-white mb-1">Secure by Design</h3>
              <p className="text-sm text-indigo-100/80 leading-relaxed">Enterprise-grade RBAC and comprehensive audit logging.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-transform hover:-translate-y-1 duration-300 shadow-xl">
              <TrendingUp className="text-blue-200 mb-3" size={28} />
              <h3 className="font-semibold text-white mb-1">Real-time Insights</h3>
              <p className="text-sm text-indigo-100/80 leading-relaxed">Live dashboards and comprehensive reporting at a glance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative bg-surface">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
            <span className="text-primary font-bold text-lg">AF</span>
          </div>
          <span className="font-bold text-xl text-text tracking-tight">AssetFlow</span>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">
          <div>
            <h2 className="text-3xl font-bold text-text tracking-tight mb-2">Welcome back</h2>
            <p className="text-muted">Enter your credentials to access your account.</p>
          </div>

          {USE_MOCK_DATA && (
            <div className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl p-5 border border-primary/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <Zap className="text-primary" size={16} />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Quick Demo Access</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(mockUsers).map(u => (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => handleMockLogin(u.email)}
                    className="flex flex-col items-start p-3 bg-surface border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <span className="text-sm font-bold text-text group-hover:text-primary transition-colors capitalize">
                      {u.role.replace('_', ' ').toLowerCase()}
                    </span>
                    <span className="text-xs text-muted truncate w-full mt-0.5">{u.email}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-4 text-muted font-semibold tracking-wider">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Input
                label="Email address"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background h-12 text-base rounded-xl transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary border-border"
              />
            </div>
            
            <div className="space-y-1.5 relative group">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background h-12 text-base rounded-xl transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary border-border pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-[38px] text-muted hover:text-primary transition-colors focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-muted/40 rounded flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-all duration-200">
                    <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted group-hover:text-text transition-colors">Remember for 30 days</span>
              </label>
              <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20 animate-in fade-in slide-in-from-top-2">
                <Activity size={18} />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 mt-4 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-[-1px] hover:shadow-primary/40 active:translate-y-[1px]"
            >
              Sign In to AssetFlow
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted pt-4">
            Don't have an enterprise account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">Request access</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

