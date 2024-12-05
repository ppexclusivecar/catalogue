import { socialMedia } from "@/data";

const Footer_light = () => {
  return (
    <footer className="relative w-full pt-4 pb-4 px-10">
      {/* background grid */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 P&P Exclusive Cars. Tous droits réservés.
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer_light;