import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-background">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
