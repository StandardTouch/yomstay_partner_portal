import { useSignIn, useClerk } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const bgImage =
  "https://plus.unsplash.com/premium_photo-1663954130790-e85da8e5539c?q=80&w=1641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const clerk = useClerk();
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
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Unexpected status: " + result.status);
      }
    } catch (err) {
      setError(err.errors ? err.errors[0].message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  async function sendResetCode() {
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err) {
      console.error(
        "Send code error:",
        err?.errors?.[0]?.longMessage || err.message
      );
      setError(err?.errors?.[0]?.longMessage || "An error occurred");
    }
  }

  async function resetPassword() {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: password,
      });

      if (result.status === "needs_second_factor") {
        setSecondFactor(true);
        setError("");
      } else if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setError("");
        navigate("/");
      } else {
        console.log("Unhandled result:", result);
      }
    } catch (err) {
      console.error(
        "Reset password error:",
        err?.errors?.[0]?.longMessage || err.message
      );
      setError(err?.errors?.[0]?.longMessage || "An error occurred");
    }
  }

  return (
    <div className="bg-lightgray flex justify-center items-center min-h-screen w-screen px-6 p-2">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col-reverse md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-xs">
            <h2 className="font-bold text-2xl mb-2 text-center md:text-left text-navyblue">
              Yomstay <span className="font-normal">Partners</span>
            </h2>
            {!resetMode ? (
              <form className="mt-6" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
                  Sign in
                </h3>
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
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-xs mb-2">{error}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-pastelgreen text-navyblue font-semibold rounded py-2 mt-2"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>
            ) : (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
                  Reset Password
                </h3>
                {!successfulCreation ? (
                  <>
                    <label className="block mb-1 text-sm">
                      Enter your email
                    </label>
                    <input
                      type="email"
                      className="w-full mb-4 px-3 py-2 border rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      onClick={sendResetCode}
                      className="w-full bg-pastelgreen text-navyblue font-semibold rounded py-2 mt-2"
                    >
                      Send Code
                    </button>
                  </>
                ) : (
                  <>
                    <label className="block mb-1 text-sm">
                      Enter Reset Code
                    </label>
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
                      className="w-full bg-pastelgreen text-navyblue font-semibold rounded py-2 mt-2"
                    >
                      Reset Password
                    </button>
                  </>
                )}
                {error && (
                  <div className="text-red-500 text-xs mt-2">{error}</div>
                )}
                {secondFactor && (
                  <div className="text-yellow-600 text-sm mt-2">
                    2FA is required. Please complete it separately.
                  </div>
                )}
                <button
                  onClick={() => setResetMode(false)}
                  className="mt-4 text-sm text-gray-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            )}
            <div className="mt-8 text-center text-xs text-gray-400">
              <div>Copyright © Yomstay.com 2025</div>
            </div>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 flex items-center justify-center min-h-[220px] md:min-h-0"
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white bg-opacity-70 rounded-xl p-6 md:p-8 max-w-md m-4 md:m-6 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-navyblue">
              WELCOME
            </h1>
            <div className="text-base md:text-lg font-medium mb-3 text-gray-700">
              TO THE NEW PORTAL
            </div>
            <ul className="text-sm md:text-base text-gray-800 space-y-2 list-disc pl-5 text-left">
              <li>
                Enjoy smoother navigation with optimized menu organization.
              </li>
              <li>
                Benefit from inventory management through our intuitive and
                ergonomic calendar.
              </li>
              <li>
                Discover a more modern interface for an optimal user experience.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
