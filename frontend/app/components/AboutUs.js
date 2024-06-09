// AboutSection.js
import React from 'react';

const AboutSection = () => {
    return (
        <section className="flex items-center  xl:h-screen  ">
            <div className="justify-center flex-1 max-w-5xl py-4 mx-auto lg:py-5 md:px-5">
                <div className="flex flex-wrap">
                    <div className="w-full px-3  lg:w-1/2 mb-10">
                        <div className="relative lg:max-w-md">
                            <img src="/main/about.jpg" alt="aboutimage" className="relative z-10 object-cover w-full rounded h-96" />
                            <div className="absolute bottom-0 right-0 z-10 p-8 bg-white border-4  border-teal-400 rounded shadow  lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-800">
                                <p className="text-lg font-semibold md:w-72">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute top-0 left-0 w-16 h-16   opacity-10" viewBox="0 0 16 16">
                                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                                    </svg> Unraveling Sri Lanka's premier scam community website.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 bg-slate-700 p-4 rounded-xl">
                        <div className="pl-4 mb-6 border-l-4 border-teal-400">
                            <span className="text-sm text-gray-600 uppercase dark:text-gray-400">Who we are?</span>
                            <h1 className="mt-2 custom-h1 md:text-5xl dark:text-gray-300">About Us</h1>
                        </div>
                        <p className="mb-6 text-base leading-7  dark:text-gray-400">
                        We're a team of computer science students from IIT Sri Lanka dedicated to providing a platform for people to share their 
                        experiences with scams. Whether you're a local or a visitor, our website is designed to help you navigate through common 
                        fraudulent activities.At ScamSensei, we believe in the power of community to combat scams. Our platform encourages users to 
                        share stories and ask questions, creating a supportive environment where everyone can learn and stay informed. Join us as we 
                        work together to make our communities safer and more secure.
                        </p>
                      
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
