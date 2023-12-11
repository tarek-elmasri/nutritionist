import Navbar from "@/components/navbar";
import CTX from "./(components)/CTX";
import Benifits from "./(components)/benefits";
import Features from "./(components)/features";
import Footer from "./(components)/footer";
import Header from "./(components)/header";
import Services from "./(components)/services";
import Image from "next/image";
import strawberry from "@/assets/strawberries.png";
import orangesImg from "@/assets/oranges.png";

const LandingPage = () => {
  return (
    <div className="main-grid">
      {/* hero section */}
      <div className="fullwidth grid-rows-[auto,1fr] items-start md:items-center  h-[100dvh] bg-gradient-green shadow-md">
        <div className="wrap-content">
          <Navbar />
        </div>
        <Header />
      </div>

      <div className="relative fullwidth">
        <div className="relative z-10 wrap-content">
          <Benifits />
        </div>
        <div className="absolute z-0 left-0 bottom-28 w-[30vw] max-w-xs  translate-x-[-40%]">
          <Image alt="strawberry fruits" src={strawberry} />
        </div>
      </div>

      <Features />
      <CTX />

      <div className="relative fullwidth overflow-hidden">
        <div className="relative z-10 wrap-content">
          <Services />
        </div>
        <div className="absolute z-0 right-0 bottom-0 w-30vw max-w-lg translate-x-[40%]">
          <Image
            alt=""
            src={orangesImg}
            className="opacity-10 lg:opacity-100"
          />
        </div>
      </div>
      <div className="fullwidth">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
