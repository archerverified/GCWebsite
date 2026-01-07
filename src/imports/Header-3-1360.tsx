import imgEmergency from "figma:asset/96eaf4517d4bf6650d76b0ac09c0f6969f9475e6.png";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";

function Container() {
  return (
    <div className="absolute bottom-[2px] h-[204px] right-[-0.4px] w-[2122px]" data-name="Container">
      <div className="absolute flex flex-col font-['Product_Sans_Medium:Regular',product-sans] justify-center leading-[27.2px] left-[1866.81px] not-italic text-[0px] text-[24px] text-black text-center text-nowrap top-[151.28px] tracking-[-0.32px] translate-x-[-50%] translate-y-[-50%]">
        <p className="mb-0">
          <span className="font-['Product_Sans:Regular',product-sans] not-italic tracking-[-0.32px]">Call</span> us at
        </p>
        <p className="font-['Product_Sans_Black:Regular',product-sans]">(817) 256-0122</p>
      </div>
      <div className="absolute h-[81.354px] left-[1739.09px] top-[57.1px] w-[209.242px]" data-name="emergency">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgEmergency} />
      </div>
      <div className="absolute h-[153.719px] left-[854px] top-[25.14px] w-[414.001px]" data-name="logo">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="Header">
      <Container />
    </div>
  );
}