import { useSignIn, useClerk } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Unexpected status: " + result.status);
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const sendResetCode = async () => {
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "An error occurred");
    }
  };

  const resetPassword = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "needs_second_factor") {
        setSecondFactor(true);
        setError("");
      } else if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "An error occurred");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row">
      {/* Left: Custom Form */}
      <div className="flex-1 h-full flex flex-col justify-center items-center bg-white shadow-lg p-6 sm:p-10">
        <div className="w-full max-w-md bg-white/90 border border-navyblue/10 rounded-xl shadow-xl p-6 sm:p-8">
          <h2 className="text-navyblue text-2xl sm:text-3xl font-bold mb-6 text-center">
            Yomstay <span className="font-normal">Partners</span>
          </h2>
          {!resetMode ? (
            <form onSubmit={handleSubmit}>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full mb-4 px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                className="w-full mb-2 px-3 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  onClick={() => setResetMode(true)}
                  className="text-xs cursor-pointer text-gray-500 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
              {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
              <button
                type="submit"
                className="w-full bg-navyblue hover:bg-navyblue/80 cursor-pointer text-white font-semibold rounded py-2 mt-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
              {!successfulCreation ? (
                <>
                  <label className="block mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    onClick={sendResetCode}
                    className="w-full bg-navyblue hover:bg-navyblue/80 cursor-pointer text-white font-semibold rounded py-2 mt-2"
                  >
                    Send Code
                  </button>
                </>
              ) : (
                <>
                  <label className="block mb-1 text-sm">Reset Code</label>
                  <input
                    type="text"
                    className="w-full mb-2 px-3 py-2 border rounded"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <label className="block mb-1 text-sm">New Password</label>
                  <input
                    type="password"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    onClick={resetPassword}
                    className="w-full bg-navyblue hover:bg-navyblue/80 cursor-pointer text-white font-semibold rounded py-2 mt-2"
                  >
                    Reset Password
                  </button>
                </>
              )}
              {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
              {secondFactor && (
                <div className="text-yellow-600 text-sm mt-2">
                  2FA is required. Please complete it separately.
                </div>
              )}
              <button
                onClick={() => setResetMode(false)}
                className="mt-4 cursor-pointer text-sm text-gray-600 hover:underline"
              >
                Back to Login
              </button>
            </div>
          )}
          <div className="mt-8 text-center text-xs text-gray-400">
            © Yomstay.com 2025
          </div>
        </div>
      </div>

      {/* Right: Logo / Design Area */}
      <div className="flex-1 h-full flex justify-center items-center bg-navyblue">
        <img
          src="/logo.png"
          alt="Logo"
          className=" object-contain h-full w-full"
        />
      </div>
    </div>
  );
};

export default SignInPage;
