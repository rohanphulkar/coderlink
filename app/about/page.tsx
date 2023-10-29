import SectionTitle from "@/components/common/SectionTitle";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="my-12">
      <div className="">
        <div className="w-full px-4 mb-10  lg:mb-0 mx-auto max-w-3xl">
          <SectionTitle title="About" />
          <div className="mb-10 w-full text-base leading-7 text-gray-500 prose mx-auto max-w-3xl">
            <div className="w-full">
              <p>
                At CoderLink, we're all about unlocking the extraordinary
                potential of AI to create exceptional content at incredibly
                affordable prices. Our mission is to make captivating,
                insightful, and engaging content accessible to all.
              </p>

              <h2>AI Magic at Your Fingertips</h2>
              <p>
                In the fast-paced digital world, content is king. CoderLink
                harnesses the power of artificial intelligence to deliver
                top-notch content tailored to your needs. We're not just good;
                we're great!
              </p>

              <h2>Budget-Friendly Brilliance</h2>
              <p>
                Exceptional content shouldn't break the bank. CoderLink offers
                top-tier content generation services at prices that won't strain
                your budget. We believe that quality and affordability can go
                hand in hand.
              </p>

              <h2>Partnering in Success</h2>
              <p>
                We're not just a platform; we're your content creation partner.
                Whether it's blogs, articles, social media posts, or more, we're
                here to help you shine. Your success is our success.
              </p>

              <p>
                Join CoderLink today and experience the future of content
                generation – where your ideas become amazing, interesting
                content with a click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
