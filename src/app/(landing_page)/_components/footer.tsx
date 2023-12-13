import Image, { type StaticImageData } from "next/image";
import NavLinks from "@/components/nav-links";
import logo from "@/assets/logo.png";
import separator from "@/assets/separator.svg";
import facebookIcon from "@/assets/facebookIcon.png";
import instagramIcon from "@/assets/instagramIcon.png";
import twitterIcon from "@/assets/twitterIcon.png";
import youtubeIcon from "@/assets/youtubeIcon.png";
import mailIcon from "@/assets/emailIcon.png";

const Footer = () => {
  return (
    <div className="w-full bg-lightgreen">
      <div className="max-w-6xl mx-auto p-12">
        <div className="grid place-items-center gap-12">
          <Image src={logo} alt="logo" width={200} />

          <ul className="flex items-center gap-6">
            <NavLinks />
          </ul>

          <Image src={separator as StaticImageData} alt="" />

          <div className="flex items-center justify-center flex-wrap gap-6">
            <Image src={facebookIcon} alt="facebook" />
            <Image src={instagramIcon} alt="facebook" />
            <Image src={twitterIcon} alt="facebook" />
            <Image src={youtubeIcon} alt="facebook" />
            <Image src={mailIcon} alt="facebook" />
          </div>

          <p className="text-sm font-light text-neutral-600">
            All Rights Reserved&copy; 2022-2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
