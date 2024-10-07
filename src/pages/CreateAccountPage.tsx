import { useState, useEffect, useRef } from 'react'
import { Eye as EyeIcon, EyeOff as EyeOffIcon, Heart } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithGoogle } from '../firebase/auth'

export default function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [imageHeight, setImageHeight] = useState('auto')
  const rightColumnRef = useRef<HTMLDivElement>(null)

  // Add these new state variables
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const updateImageHeight = () => {
      if (rightColumnRef.current) {
        const viewportHeight = window.innerHeight
        const rightColumnTop = rightColumnRef.current.getBoundingClientRect().top
        const availableHeight = viewportHeight - rightColumnTop - 32 // 32px for some padding
        setImageHeight(`${availableHeight}px`)
      }
    }

    updateImageHeight()
    window.addEventListener('resize', updateImageHeight)
    return () => window.removeEventListener('resize', updateImageHeight)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      await createUserWithEmailAndPassword(email, password)
      navigate('/create-memorial')
    } catch (error: any) {
      console.error('Error creating account:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/create-memorial')
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      setError(error.message || 'Failed to sign in with Google. Please try again.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <div className="h-20 flex items-center justify-center">
          <div className="flex items-center">
            <Heart className="h-10 w-10 text-red-500 mr-2" />
            <span className="text-2xl font-bold">Forever Living</span>
          </div>
        </div>
        <div className="w-full h-1 bg-red-500" style={{ clipPath: 'url(#wave)' }}></div>
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave" clipPathUnits="objectBoundingBox">
              <path d="M0,0.5 C0.25,1 0.75,0 1,0.5 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="flex-1 p-4 sm:p-8 md:p-12 lg:p-16 flex justify-center">
          <div className="w-full max-w-[323px]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-blue-600">Create an Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                  className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password*"
                  className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Create Account
              </button>
            </form>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
            <div className="mt-6 text-center text-sm text-gray-500">OR</div>
            <div className="mt-6 space-y-3">
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={rightColumnRef} className="flex-1 bg-gray-100 p-4 sm:p-8 md:p-12 lg:p-16 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-blue-600">
          Create a beautiful, lasting online memorial for your loved one:
        </h2>
        <ul className="space-y-4 mb-8 text-sm sm:text-base">
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Easy to build</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Ad free; safe and secure</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Invite unlimited family and friends to contribute</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Unlimited space for images, videos and stories</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Full control: manage who sees and contributes to memorial</span>
          </li>
        </ul>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Memories App Preview</h3>
          <div className="relative" style={{ height: imageHeight, maxHeight: '600px' }}>
            <img 
              src="/images/preview-image.avif" 
              alt="Memories App Preview" 
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}