 
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import logos from "../../public/logos.png";
import { FcGoogle } from 'react-icons/fc';
import { BiShow, BiHide } from 'react-icons/bi';
import Layout from '@/app/layout/layout';
import styles from '../../styles/Form.module.css';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (auth?.user) {
      router.push('/');
    }
  }, [auth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      toast.loading('Logging in...', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Logged in successfully', { id: 'login' });
      router.push('/');
    } catch (error) {
      toast.error(`Failed to login ${error}`, { id: 'login' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Layout>
      <section className=" md:w-3/4 mx-auto flex flex-col gap-3 px-4 py-8 lg:py-16">

      <div className={styles.logoContainer}>
          <Link href="/" passHref>
            <Image src={logos} alt="Logo" width={40} height={40} className="mx-auto" />
          </Link>
      </div>

        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-3">Welcome Back!</h1>
          <p className="text-gray-400">Login Here</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              value={formData.password}
              onChange={handleInputChange}
            />
            <span className="icon flex items-center px-4 cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>

          
        </form>

        <p className="text-center text-gray-400">
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-blue-700 ">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default Page;
