import React, { useState, useEffect, useRef } from 'react'
import { EyeIcon, EyeOffIcon, Heart } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPasswordFunc } from "../firebase/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [imageHeight, setImageHeight] = useState('auto')
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      await signInWithEmailAndPasswordFunc(email, password)
      navigate('/create-memorial')
    } catch (err: any) {
      console.error('Error signing in with email and password', err)
      setError(err.message || 'Failed to log in.')
    } finally {
      setIsLoading(false)
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
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-blue-600">Log in to Forever Living</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password*"
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
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <p className="mt-4 text-sm text-gray-600 text-center">
              Don't have an account? <Link to="/create-account" className="text-blue-600 hover:underline">Create an account</Link>
            </p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Login for partners</h3>
              <div className="space-y-3">
                <button className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="w-5 h-5 mb-2 sm:mb-0 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Forever Living Connect</span>
                </button>
                <button className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="w-5 h-5 mb-2 sm:mb-0 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Live Streaming</span>
                </button>
              </div>
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
              src="/public/images/preview-image.avif" 
              alt="Memories App Preview" 
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}