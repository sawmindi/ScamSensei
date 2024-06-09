"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { GoFileDirectoryFill } from "react-icons/go";


const style = {
  input:
    "bg-[#2a2a2b] border border-[#343536] px-4 py-2 text-left text-sm text-white focus:outline-none rounded",
  wrapper: "flex flex-col p-6 border  rounded-lg shadow  border-gray-700",
  title: "text-[#FFFFFF] pb-3 text-lg font-medium",
  PostButton:
    "bg-teal-400 px-4 py-1.5 font-semibold text-white rounded-full hover:bg-[#3c3c5d] focus:outline-none",
  PostButtonContainer: "flex justify-end pt-2 ",
  select:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  loading: "text-white font-semibold",
};

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState("");

  const auth = useAuth();
  const router = useRouter();
  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title");
      const name = formData.get("name");
      const district = formData.get("district"); 
      const scam = formData.get("scam");
      const myFile = postImage;

      // Submit the combined content to the server
      await auth.scamPost(name, district, scam, title, myFile);

      console.log("base64:", postImage);
      toast.success("Post submitted successfully.");
      router.push("/PostList");
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Error submitting post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPostImage(base64);
     
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div>
      <div className={style.wrapper}>
        {loading && <div className={style.loading}>loading</div>}
        <h1 className={style.title}>Create a Post</h1>
        <form
          className="flex flex-col space-y-2 rounded p-4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium  text-white"
          >
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title for your post
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label
            htmlFor="district"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select the district where the scam occured
          </label>

          <select className={style.select} name="district" id="district">
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <label
            htmlFor="scam"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            The Scam you experienced
          </label>
          <textarea
            id="scam"
            name="scam"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your experience with a scam"
          ></textarea>
          <div>
            <label
              htmlFor="file_input"
              className="block mb-2 text-sm font-medium text-white"
            >
              Upload file
            </label>
            <input
              id="file_input"
              type="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
              className=" w-full text-2xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div className={style.PostButtonContainer}>
            <button
              className={style.PostButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
