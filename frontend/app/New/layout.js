import Navbar from "../components/Navbar";


export const metadata = {
    title: "ScamSensei",
    description: "For scam prevention",
  };
export default function PostListLayout({
    children, 
  }) {
    return (
      <section>
        <Navbar />
        {children}
      </section>
    )
  }