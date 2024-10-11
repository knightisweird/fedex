import PromoSection from "@/components/body";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MarqueeText from "@/components/marquee";
import Track from "@/components/track/track";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Track />
      <div className="p-6 my-[40px] bg-[#4d148c] flex items-center">
        <MarqueeText text="Huge small business savings start here!" />
      </div>
      <PromoSection />
      <Footer />
    </div>
  );
}
