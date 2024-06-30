"use client";
import { Button } from "@/components/ui/button";
import { PricingCards } from "@/constants";
import { IPricingCard } from "@/types";
import { useUser } from "@clerk/nextjs";
import { CircleArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type PricingProp = {
  pricingPage?: boolean;
  cardData?: (card: IPricingCard) => void;
};

const PricingSection = ({ pricingPage, cardData }: PricingProp) => {
  const path = usePathname();
  const router = useRouter();

  const { isSignedIn } = useUser();
  return (
    <section className=" my-4  w-full flex flex-col gap-4 items-center p-2 rounded-md shadow-md">
      {/* section heading  */}
      <span className="bg-gradient-to-r from-pink-500  to-indigo-500 text-5xl   hover:border-b-4 hover:border-purple-500 inline-block w-fit   text-transparent bg-clip-text">
        Pricing
      </span>

      {/* subheading  */}
      <span className="text-white font-semibold text-justify">
        We provides our services at very affordable price, that anyone can
        afford our premium plans.
      </span>

      {/* cards container  */}
      <div
        className={`grid w-full  xl:grid-cols-3 lg:grid-cols-2  md:grid-cols-2 grid-cols-1 place-items-center`}
      >
        {PricingCards.map((item, index) => (
          // Pricing Card \
          <div
            key={index}
            onClick={() => {
              if (isSignedIn) {
                return router.push("/dashboard");
              }
              return router.push("/sign-in");
            }}
            className={`bg-glass backdrop-blur-md ${
              item.amount === 49 && "border-2 relative border-pink-400"
            } flex flex-col duration-500  transition-all hover:shadow-md hover:scale-110  hover:border-2 hover:border-pink-500 hover:shadow-violet-400 items-center  px-2 py-4 min-h-[450px] xl:w-[350px] md:w-[320px] w-[300px]  lg:my-4 m-2 rounded-md`}
          >
            {/* popular card  */}
            {item.amount === 49 && (
              <span className="bg-pink-600 absolute -top-3  text-white font-semibold rounded-full px-4 py-[2px]">
                popular
              </span>
            )}
            <span className="text-white text-3xl font-semibold">
              {item.name}
            </span>

            {!item.custom && (
              <span className="text-6xl  text-white my-2"> ₹{item.amount}</span>
            )}
            {item.benifits ? (
              <div className="flex py-8 mb-4 flex-col gap-1  flex-grow">
                {item.benifits.map((item, index) => (
                  <>
                    <span
                      className="flex text-white text-lg font-semibold flex-row items-center gap-2"
                      key={index}
                    >
                      {" "}
                      <CircleArrowUp
                        size={28}
                        className="bg-white rounded-full text-green-600 p-1 font-bold"
                      />
                      {item}
                    </span>
                  </>
                ))}
              </div>
            ) : (
              // custom pricing button
              <div className="relative  flex-grow">
                <span className="text-lg font-semibold text-white mt-4">
                  Contact us for custom Uses.
                </span>

                <Link
                  href={`/Contact`}
                  className="w-[80%] absolute bottom-2 left-6 bg-white hover:shadow-lg hover:shadow-pink-400 duration-500 transition-all  hover:bg-gradient-to-tr from-pink-500 via-indigo-500 hover:text-white rounded-md px-5 py-2 text-center text-lg font-semibold text-black  "
                >
                  Contact us
                </Link>
              </div>
            )}

            {/* purchase button  */}
            {pricingPage && !item.custom && (
              <Button
                onClick={async () => {
                  if (cardData) {
                    return await cardData(item);
                  }
                }}
                className="bg-white  text-black w-[80%] hover:bg-purple-500 hover:text-white font-semibold text-lg"
              >
                Continue
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
