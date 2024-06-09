"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from "react-icons/fa";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", message);

    // Added fetch API here
    const res = await fetch("api/contact", {
      method: "POST", // Added POST method here
      headers: {
        "Content-type": "application/json", // Added content type here
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    }); // Added API endpoint here

    const { msg, success } = await res.json(); // Added response here
    setError(msg); // Added error message here
    console.log(error); // Added console log here
    setSuccess(success); // Added success message here
    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16  lg:px-4 lg:py-4">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <h2 className="font-heading mb-4 custom-h1 tracking-tight  sm:text-5xl">
              Contact Us
            </h2>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-400">
                Encountering a technical issue? Have feedback regarding a our
                features? We're all ears. Let us know.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-teal-400 yellow-100 text-gray-50">
                    <FaPhoneAlt />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-white">
                      Contact
                    </h3>
                    <p className="text-gray-400">Mobile: (+94) 768083220</p>
                    <p className="text-gray-400">Mail: iit.ac.lk</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-teal-400 text-gray-50">
                    <FaRegClock />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-white">
                      Working hours
                    </h3>
                    <p className="text-gray-400">
                      Monday - Friday: 08:00 - 17:00
                    </p>
                    <p className="text-gray-400">
                      Saturday &amp; Sunday: 08:00 - 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="fullname"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        id="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="message"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      cols="30"
                      rows="5"
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                      id="message"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="w-1/2 border text-white border-teal-400 px-6 py-3 font-xl rounded-md sm:mb-0 hover:bg-teal-400"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>

              <div className="bg-slate-100 flex flex-col  text-center mb-2 mt-4 w-full rounded-md shadow-md  sm:mb-0">
                {error &&
                  error.map((e,key) => (
                    <div key={key}
                      className={`${
                        success ? "text-green-800" : "text-red-600"
                      } px-5 py-2`}
                    >
                      {e}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
