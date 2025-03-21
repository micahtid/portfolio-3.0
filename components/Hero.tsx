import { FaBell } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { navLinks } from "@/data";

const Hero = () => {
  const highlights = [
    {
      icon: <FaBell />,
      title: "Current Status",
      description: "Cambridge A-Level Student @ Surabaya European School"
    },
    {
      icon: <IoMdPin />,
      title: "Location",
      description: "Surabaya, Indonesia"
    }
  ];

  return (
    <section className="
      max-w-[1920px] w-full mx-auto 
      min-h-screen
      default-padding py-[120px] max-lg:py-20 max-md:py-12
      flex flex-col gap-y-8 justify-between max-lg:justify-start
    ">

        <h1 className="default-heading">
          I'm Micah, I build <br className="max-sm:hidden" />
          <span className="font-accent">full-stack</span> applications.
        </h1>

        <div className="
        flex flex-col gap-y-2 
        self-end max-lg:self-start
        items-end max-lg:items-start
        ">
          {navLinks.map((link, index) => (
            <div key={index} className="
              flex gap-x-2 items-center
              group
            ">
              <div className="w-8 h-[1px] rounded-full bg-black/40 group-hover:w-0 transition-all duration-500 ease-in-out origin-right" style={{ minWidth: '0px' }} />
              <a 
                href={link.href} 
                className="default-subheading font-accent whitespace-nowrap relative overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black/70 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </a>
            </div>
          ))}
        </div>

        <div className="
          flex items-center gap-x-12 mt-6
          max-lg:self-end max-lg:mt-auto max-md:self-start
          max-md:flex-col max-md:items-start max-md:gap-y-4
        ">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col gap-y-2">
              <div className="text-2xl max-md:text-xl">
                {highlight.icon}
              </div>
              <div>
                <h3 className="default-text font-semibold">{highlight.title}</h3>
                <p className="default-text -mt-1 text-gray-700">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

    </section>  
  );
};

export default Hero;