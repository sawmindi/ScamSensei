import React from "react";

const VideoPlayer = () => {
    return (
        <div className="text-center px-4">
            <div className="custom-h1">How To Use ScamSensei</div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                This brief video provides a concise introduction to our platform, helping you navigate its features effortlessly. Whether you're a 
                newcomer or returning visitor, take a moment to familiarize yourself with our interface and discover how to maximize your experience. 
                Thank you for choosing us – let's get started.
            </p>
            <div className="flex justify-center">
                <video className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl" controls>
                    <source src="/main/Promotional.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default VideoPlayer;
