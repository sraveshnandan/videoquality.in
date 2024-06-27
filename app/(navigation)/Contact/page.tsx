"use client";
import Loader from "@/components/shared/landing/Loader";
import { deviceTokens } from "@/constants";
import { sendNt } from "@/libs/actions";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {};

const Contact = (props: Props) => {
  const [loading, setloading] = useState(false);
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setloading(true);
    const name = ev.target[0].value;
    const email = ev.target[1].value;
    const sub = ev.target[2].value;
    const message = ev.target[3].value;

    const title = "A new contact us form submitted.";
    const body = `A new Contact us form submitted. Details : name: ${name}, subject: ${sub} email: ${email}, query: ${message}`;

    const res = await sendNt(deviceTokens, title, body);
    setloading(false);
    toast.success("Your request sent.");
    console.log(res);
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="h-screen  text-white my-8 rounded-lg">
      <div className="pt-10 md:pt-20">
        <div className="p-4 md:p-8 flex items-center flex-col">
          <h1 className="text-white text-center  font-light text-4xl md:text-5xl lg:text-6xl">
            Contact Us
          </h1>

          <span className="text-white/50 pb-8 w-fit mx-auto">
            If you have any query, feel free to contact us.
          </span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center"
          >
            <div className="md:w-3/4 lg:w-2/3 xl:w-1/2">
              <div className="flex flex-col md:flex-row">
                <input
                  required
                  id="name"
                  type="text"
                  className="my-2 py-2 px-4 rounded-md bg-glass text-gray-300 w-full md:w-1/2 md:mr-2 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Name"
                />
                <input
                  required
                  id="email"
                  type="email"
                  className="my-2 py-2 px-4 rounded-md bg-glass text-gray-300 w-full md:w-1/2 md:ml-2 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Email"
                />
              </div>
              <input
                required
                id="subject"
                type="text"
                placeholder="Subject"
                className="my-2 py-2 px-4 rounded-md bg-glass text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                id="message"
                rows={5}
                placeholder="Say Something"
                className="my-2 py-2 px-4 rounded-md bg-glass text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="text-md bg-white text-black px-5 py-3 rounded-md  transition-all duration-500 hover:text-white hover:shadow-lg hover:shadow-pink-500  hover:bg-gradient-to-tr from-pink-500 to-indigo-500 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
