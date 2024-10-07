import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithGoogle, createUserWithEmailAndPassword } from '../firebase/auth';
import { Eye, EyeOff, Heart } from 'lucide-react';

const TryFreePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle error (show message to user)
    }
  };

  return (
    <>
      {/* Left side: Form */}
      <div className="w-1/2 bg-white p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-[316px]">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <Heart size={32} className="text-[#ff4d79]" />
              <span className="text-3xl font-serif font-bold">Forever Living</span>
            </Link>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[54px] px-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[54px] px-3 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full h-[54px] bg-blue-500 text-white rounded font-semibold">
              Create Account
            </button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 bg-white">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full h-[54px] border border-gray-300 rounded flex items-center justify-center mb-3"
          >
            <img src="/images/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <button className="w-full h-[54px] border border-gray-300 rounded flex items-center justify-center">
            <img src="/images/apple-icon.png" alt="Apple" className="w-5 h-5 mr-2" />
            Continue with Apple
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
          </p>
        </div>
      </div>

      {/* Right side: Benefits and Preview */}
      <div className="w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Create a beautiful, lasting online memorial for your loved one:
        </h2>
        <ul className="space-y-2 text-blue-700 mb-8">
          <li>✓ Easy to build</li>
          <li>✓ Ad free; safe and secure</li>
          <li>✓ Invite unlimited family and friends to contribute</li>
          <li>✓ Unlimited space for images, videos and stories</li>
          <li>✓ Full control: manage who sees and contributes to memorial</li>
        </ul>
        <div className="flex-grow flex items-center justify-center">
          <img src="/images/memorial-preview.png" alt="Memorial Preview" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </>
  );
};

export default TryFreePage;