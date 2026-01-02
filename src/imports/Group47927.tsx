import imgGarageCowboy from "figma:asset/fce6836bcb99568ff9db38777d36435b1e9708aa.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute flex flex-col font-['Product_Sans:Bold',product-sans] justify-center leading-[0] left-[482.59px] not-italic text-[#323232] text-[52px] text-center text-nowrap top-[137.99px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[42px]">{`GARAGE DOOR & REPAIR SERVICES`}</p>
      </div>
      <div className="absolute h-[79.52px] left-0 top-0 w-[963.777px]" data-name="GarageCowboy">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgGarageCowboy} />
      </div>
    </div>
  );
}