import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="relative w-full max-w-5xl h-[calc(100vh-4rem)] max-h-[640px] min-h-[460px]">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center md:border-r border-slate-600/30 overflow-y-auto no-scrollbar">
            <div className="w-full max-w-md my-auto">
              <div className="text-center mb-3 sm:mb-4">
                <MessageCircleIcon className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-slate-400 mb-1.5" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-0.5">Create Account</h2>
                <p className="text-slate-400 text-xs sm:text-sm">Sign up for a new account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />

                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />

                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button className="auth-btn mt-1" type="submit" disabled={isSigningUp}>
                  {isSigningUp ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-3 sm:mt-4 text-center">
                <Link to="/login" className="auth-link">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div className="text-center max-w-sm">
              <img
                src="/signup.png"
                alt="People using mobile devices"
                className="w-full max-h-[240px] lg:max-h-[280px] object-contain mx-auto"
              />
              <div className="mt-3 sm:mt-4 text-center">
                <h3 className="text-base sm:text-lg font-medium text-cyan-400">Start Your Journey Today</h3>

                <div className="mt-2 sm:mt-3 flex justify-center gap-2 sm:gap-3">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default SignUpPage;
