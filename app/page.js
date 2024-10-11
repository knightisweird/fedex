import PromoSection from "@/components/body";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import MarqueeText from "@/components/marquee";
import Track from "@/components/track/track";
import info from "@/assets/question.svg";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Track />
      <div className="bg-[#4d148c]">
        <div className="max-w-[1200px] mx-auto p-6 py-3 md:py-5 my-[40px] flex gap-4 items-center">
          <Image src={info} width={40} height={40} />
          <MarqueeText texts={["Huge small business savings start here!", "Huge small business savings start here!", "Huge small business savings start here!"]} />
        </div>
      </div>

      <PromoSection />
      <Footer />
    </div>
  );
}
