
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, AlertTriangle, Hash, Phone } from 'lucide-react';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSignUpDefault = searchParams.get('view') === 'signup';

  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',      
    password: '',
    fullName: '',
    roll: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const cleanRoll = formData.roll.trim();
        const cleanPhone = formData.phoneNumber.trim();
        
        if (!/^\d{6}$/.test(cleanRoll)) {
          throw new Error("Roll Number must be exactly 6 digits.");
        }
        if (!/^\d{11}$/.test(cleanPhone)) {
          throw new Error("Phone Number must be exactly 11 digits.");
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            data: { 
              full_name: formData.fullName,
              roll: cleanRoll,
              phone_number: cleanPhone
            }
          }
        });
        
        if (signUpError) throw signUpError;

        if (signUpData.user) {
          await supabase.from('profiles').upsert({
            id: signUpData.user.id,
            full_name: formData.fullName,
            roll: cleanRoll,
            phone_number: cleanPhone,
            email: formData.email.trim()
          });
        }
        
        alert('Registration Successful!');
        setIsSignUp(false);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });
        
        if (signInError) throw signInError;
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8"><BackButton /></div>
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 border border-slate-100 animate-scale-in">
        <div className="text-center mb-10">
          <Logo className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 uppercase">{isSignUp ? 'Member Signup' : 'Member Login'}</h2>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="email" placeholder="EMAIL" required className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
          {isSignUp && (
            <>
              <input type="text" placeholder="FULL NAME" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
              <input type="text" placeholder="ROLL (6 DIGITS)" required maxLength={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" value={formData.roll} onChange={e => setFormData({ ...formData, roll: e.target.value.replace(/\D/g, '') })} />
              <input type="tel" placeholder="PHONE (11 DIGITS)" required maxLength={11} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })} />
            </>
          )}
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type={showPassword ? 'text' : 'password'} placeholder="PASSWORD" required className="w-full pl-14 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
          </div>
          {error && <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-[11px] font-bold text-center">{error}</div>}
          <button disabled={isLoading} className="w-full py-5 bg-logo-gradient text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">
            {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
          </button>
        </form>
        <div className="mt-8 text-center">
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{isSignUp ? 'Already a member? Login' : "Not a member? Join"}</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
