import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Example() {
    return (
      <>
        <Navbar />
        <div className=" w-full h-full">
        <main className="grid place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
          <div className="text-center">
            <p className=" font-semibold text-indigo-400 text-6xl">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Go back home
              </a>
              
            </div>
          </div>
        </main>
        </div>
        <Footer />
      </>
    )
}
