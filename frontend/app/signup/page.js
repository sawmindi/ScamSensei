"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logos from "../../public/logos.png";
import { BiShow, BiHide } from "react-icons/bi";
import Layout from "@/app/layout/layout";
import styles from "../../styles/Form.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Page() {
  const auth = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");
  useEffect(() => {
    if (auth?.user) {
      router.push("/");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setError(null);
    try {
      toast.loading("Signing Up", { id: "signin" });
      await auth?.signup(name, email, password);
      toast.success("Signed up successfully", { id: "signin" });
      router.push("/");
    } catch (error) {
      toast.error(`Failed to signup ${error}`, { id: "signin" });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Layout>
      <section className="w-full md:w-3/4  mx-auto flex flex-col gap-3 px-4">

      <div className={styles.logoContainer}>
          <Link href="/" passHref>
            <Image src={logos} alt="Logo" width={40} height={40} className="mx-auto" />
          </Link>
      </div>
      
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-3">
            Get Started Now!
          </h1>
          <p className="text-gray-400">Create Your Account Here.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className={styles.input_text}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4 cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Have an account?{" "}
          <Link href={"/Signin"} className="text-blue-700 ">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default Page;
