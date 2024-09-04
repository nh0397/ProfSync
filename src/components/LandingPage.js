import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return; // Wait for Clerk to finish loading
    }

    if (isSignedIn) {
      navigate('/dashboard'); // Redirect to dashboard if already signed in
    } else {
      const signedOut = sessionStorage.getItem('signedOut');
      if (signedOut) {
        setShowContent(true); // Show content immediately without animation
        sessionStorage.removeItem('signedOut');
      } else {
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 2000); // Delay before showing the main content
        return () => clearTimeout(timer);
      }
    }
  }, [isSignedIn, isLoaded, navigate]);

  return (
    <div className="landing-page">
      <div className={`content ${showContent ? 'show' : ''}`}>
        <h1 className="title">Profsync</h1>
        <p className="description">Your AI-powered professor rating platform.</p>
        <p className="description">Ask our chatbot anything about professors, and get instant answers!</p>
        <div className="auth-buttons">
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign Up</button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
