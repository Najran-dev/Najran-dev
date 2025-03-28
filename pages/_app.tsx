import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize theme from localStorage on component mount
    const savedTheme = localStorage.getItem('theme') || 'dark'
    
    // Apply the saved theme
    document.documentElement.classList.toggle('light-mode', savedTheme === 'light')
    document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark')
  }, [])
  
  return <Component {...pageProps} />
}

export default MyApp