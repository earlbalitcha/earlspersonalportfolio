import Image from "next/image";
import {MapPin, Phone, Mail} from "lucide-react";
import ContactFormButton from "./contact-form-button";

export default function CallToAction() {
  const address = "Bulo, Victoria, Tarlac";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  const phoneDisplay = "+63 926 787 6389"; // formatted
  const phoneHref = "tel:+639267876389";

  const email = "earlbalitcha@gmail.com";
  const emailHref = `mailto:${email}`;

  return (
    <section
      id="contact"
      className="card my-20 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        {/* Text content */}
        <div className="w-full md:w-3/5 z-10">
          <h2 className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            Contact{" "}
            <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">
              Information
            </span>{" "}
          </h2>

          <div className="space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="mt-1 shrink-0">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </span>
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Address
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline focus:underline outline-none">
                  {address}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <span className="mt-1 shrink-0">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </span>
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Phone
                </p>
                <a
                  href={phoneHref}
                  className="hover:underline focus:underline outline-none">
                  {phoneDisplay}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <span className="mt-1 shrink-0">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </span>
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Email
                </p>
                <a
                  href={emailHref}
                  className="break-all hover:underline focus:underline outline-none">
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-8">
            <ContactFormButton />
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
          <Image
            src="/purple-circle-wave-static.png"
            alt="Purple Wave"
            width={500}
            height={500}
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
          />
        </div>
      </div>
    </section>
  );
}
