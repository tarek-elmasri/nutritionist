import CTX from "./(components)/CTX";
import Benifits from "./(components)/benefits";
import Features from "./(components)/features";
import Footer from "./(components)/footer";
import Header from "./(components)/header";
import Services from "./(components)/services";

const LandingPage = () => {
  return (
    <div className="font-bold">
      <Header />
      <Benifits />
      <Features />
      <CTX />
      <Services />
      <Footer />
    </div>
  );
};

export default LandingPage;
