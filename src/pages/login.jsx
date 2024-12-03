import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentFirstName, setCurrentLastName, setAccountType, setBusinessName, setCurrentEmail, setLocation } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const fetchUserProfile = async (email) => {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? (userDoc.data()) : null;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      const userCredential = await doSignInWithEmailAndPassword(values.email, values.password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        setErrorMessage("Email not verified!");
        return;
      }

      const profileData = await fetchUserProfile(user.email);
      if (profileData) {
        setCurrentFirstName(profileData.firstName);
        setCurrentLastName(profileData.lastName);
        setAccountType(profileData.accountType);
        setBusinessName(profileData.businessName || "");
        setLocation(profileData.location);
        setCurrentEmail(user.email);

        navigate("/");
      } else {
        setErrorMessage("Account not found. Please sign up.");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error.code));
    } finally {
      setSubmitting(false);
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      const result = await doSignInWithGoogle();
      const user = result.user;

      const profileData = await fetchUserProfile(user.email);
      if (profileData) {
        setCurrentFirstName(profileData.firstName);
        setCurrentLastName(profileData.lastName);
        setAccountType(profileData.accountType);
        setBusinessName(profileData.businessName || "");
        setLocation(profileData.location);
        setCurrentEmail(user.email);

        navigate("/");
      } else {
        setErrorMessage("Account not found. Please sign up.");
      }
    } catch (err) {
      setErrorMessage(getErrorMessage(err.code));
    } finally {
      setIsSigningIn(false);
    }
  };

 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#2E5CAF]">Login</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-4 bg-white">
                {errorMessage && (
                  <div className="text-red-600 font-medium text-center">
                    {errorMessage}
                  </div>
                )}
                <label className="flex flex-col">
                  <span className="text-gray-700 font-medium">Email</span>
                  <Field
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF] focus:outline-none focus:ring-2 focus:ring-[#234A86]"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </label>
                <label className="flex flex-col">
                  <span className="text-gray-700 font-medium">Password</span>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF] focus:outline-none focus:ring-2 focus:ring-[#234A86] "
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-[#2E5CAF] focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting || isSigningIn}
                  className={`mt-4 px-4 py-2 rounded-lg text-white transition w-3/4 ${
                    isSubmitting || isSigningIn
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2E5CAF] hover:bg-[#234A86]"
                  }`}
                >
                  {isSigningIn ? "Signing in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
  
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <p className="text-gray-500 mx-2">OR</p>
            <hr className="flex-grow border-gray-300" />
          </div>
  
          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            className={`flex items-center justify-center w-full px-4 py-2 rounded-lg text-white transition ${
              isSigningIn
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2E5CAF] hover:bg-[#234A86]"
            }`}
          >
            <FaGoogle size={18} />
            <span className="ml-3">{isSigningIn ? "Processing..." : "Sign in with Google"}</span>
          </button>
  
          <div className="text-center mt-6">
            <span className="text-gray-700">Don’t have an account? </span>
            <Link to="/signup" className="text-[#2E5CAF] font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
