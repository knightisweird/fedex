import React from "react";
import Image from "next/image";
import icon1 from "@/assets/icon1.png";
import icon2 from "@/assets/icon2.png";
import icon3 from "@/assets/icon3.png";
import icon4 from "@/assets/icon4.png";
import sampleImage from "@/assets/hrimage.jpg";
import fedfifty from "@/assets/fedex50.jpg";
import item1 from "@/assets/item1.jpg";
import item2 from "@/assets/item2.webp";
import item3 from "@/assets/item3.webp";
import dispatch from "@/assets/dispatch.jpg";
import HorizontalCard from "./cards/horizontal";
import VerticalCard from "./cards/vertical";

const PromoSection = () => {
  return (
    <section className="py-8 px-4 md:px-16 lg:px-32">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between gap-[50px] md:gap-[40px]">
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={icon1} width={80} height={80} />
            <h3 className="uppercase text-[18px] text-[#1b1b1b] font-semibold mt-4">
              Drop off a package
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={icon2} width={80} height={80} />
            <h3 className="uppercase text-[18px] text-[#1b1b1b] font-semibold mt-4">
              Redirect a package
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={icon1} width={80} height={80} />
            <h3 className="uppercase text-[18px] text-[#1b1b1b] font-semibold mt-4">
              Store hours & services
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={icon3} width={80} height={80} />
            <h3 className="uppercase text-[18px] text-[#1b1b1b] font-semibold mt-4">
              Service alerts
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src={icon4} width={80} height={80} />
            <h3 className="uppercase text-[18px] text-[#1b1b1b] font-semibold mt-4">
              Return a package
            </h3>
          </div>
        </div>
        {/* Horizontal Card */}
        <div className="my-[80px]">
          <HorizontalCard
            title="One Rate fits all"
            content="FedEx can ship your holiday packages for less than the Post Office. Two-day retail shipping, one flat rate.
FedEx One Rate.**"
            cta="Start Shipping with One Rate"
            cover={sampleImage}
          />
        </div>
        <div>
          <h2 className="font text-[28px] md:text-[42px] text-[#1b1b1b] text-center">
            The holidays are almost here. Deliver more happy with fast, reliable
            shipping.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-[40px]">
          <VerticalCard
            title="Track your package from pickup to delivery"
            content="No need to wonder about the status of a shipment. Use map view to see where a package is in the delivery process. Then receive a picture confirming delivery. "
            cta="Track a shipment
"
            cover={item1}
          />
          <VerticalCard
            title="Reach farther, faster—with FedEx Ground®"
            content="Need to reach rural customers fast? FedEx Ground is faster to more locations than UPS Ground and delivers to more ZIP codes. Learn more ways FedEx helps."
            cta="Ship now with ground"
            cover={item2}
          />
          <VerticalCard
            title="Get holiday-ready with these resources"
            content="Prep for the hustle and bustle now by exploring visibility tools, service alert options, and more. And don’t forget to bookmark our last-days-to-ship schedule."
            cta="Access holiday resources"
            cover={item3}
          />
        </div>
        <div className="my-[80px]">
          <HorizontalCard
            title="Celebrating Hispanic Heritage Month"
            content="Hispanic Heritage Month is a month-long celebration of Hispanic and Latino history and culture. See how some of our team members stay connected to their roots and why they feel diversity and inclusion matter."
            cta="Read the stories"
            cover={dispatch}
          />
        </div>
        <div>
          <h3 className="font text-[24px] md:text-[38px] text-[#333] text-center">
            The more you know, the smarter you ship.
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-[40px]">
          <VerticalCard
            title="Track your package from pickup to delivery"
            content="No need to wonder about the status of a shipment. Use map view to see where a package is in the delivery process. Then receive a picture confirming delivery. "
            cta="Track a shipment
"
            cover={item1}
          />
          <VerticalCard
            title="Reach farther, faster—with FedEx Ground®"
            content="Need to reach rural customers fast? FedEx Ground is faster to more locations than UPS Ground and delivers to more ZIP codes. Learn more ways FedEx helps."
            cta="Ship now with ground"
            cover={item2}
          />
          <VerticalCard
            title="Get holiday-ready with these resources"
            content="Prep for the hustle and bustle now by exploring visibility tools, service alert options, and more. And don’t forget to bookmark our last-days-to-ship schedule."
            cta="Access holiday resources"
            cover={item3}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mb-[40px]">
        <Image src={fedfifty} />
        <h5 className="text-[#1b1b1b] text-center text-[26px] md:text-[36px]">Celebrating 50 years of driving what’s next</h5>
        <p className="w-[90%] md:w-[70%] text-center text-[#333] text-[16px] md:text-[20px]">
          FedEx is turning 50 in April. Get to know the team who create,
          innovate, and connect you with the people and products you love.
        </p>
      </div>
    </section>
  );
};

export default PromoSection;
