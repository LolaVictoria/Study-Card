import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, doc, setDoc } from "../../firebase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      await sendEmailVerification(user);

      navigate("/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage(getErrorMessage(error.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const [firstName, ...lastNameArr] = user.displayName.split(" ");
      const lastName = lastNameArr.join(" ");

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate("/login");
    } catch (error) {
      console.error("Google Sign-In error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#2E5CAF]">
          Create Account
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4 bg-white">
              {errorMessage && (
                <div className="text-red-600 font-medium text-center">{errorMessage}</div>
              )}
              <label className="flex flex-col">
                <span className="text-gray-700 font-medium">First Name</span>
                <Field
                  type="text"
                  name="firstName"
                  className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF]"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 font-medium">Last Name</span>
                <Field
                  type="text"
                  name="lastName"
                  className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF]"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 font-medium">Email</span>
                <Field
                  type="email"
                  name="email"
                  className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF]"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 font-medium">Password</span>
                <Field
                  type="password"
                  name="password"
                  className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF]"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 font-medium">Confirm Password</span>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="mt-2 px-3 py-2 rounded-lg ring ring-[#2E5CAF]"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
              </label>
              <button
                type="submit"
                disabled={isSubmitting || isProcessing}
                className={`mt-4 px-4 py-2 rounded-lg text-white transition w-3/4 ${
                  isSubmitting || isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#2E5CAF] hover:bg-[#234a86]"
                }`}
              >
                {isSubmitting || isProcessing ? "Registering..." : "Sign Up"}
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
          onClick={handleGoogleSignIn}
          disabled={isProcessing}
          className={`flex items-center justify-center w-full px-4 py-2 rounded-lg text-white transition ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2E5CAF] hover:bg-[#234A86]"
          }`}
        >
          <FaGoogle size={18} />
          <span className="ml-3">{isProcessing ? "Processing..." : "Sign Up With Google"}</span>
        </button>
  
        <div className="text-center mt-6">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-[#2e5CAF] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default SignUp;
