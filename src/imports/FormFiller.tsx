import svgPaths from "./svg-pry7uv8zg5";
import imgVerified from "figma:asset/52e672056319f396f2b1bf45a03eee134d6b47d8.png";
import imgGmail from "figma:asset/a3e4058ae769d1d9a0cd5c9e6f8d349b2c963f57.png";

function Container() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Product_Sans_Medium:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(48,49,53,0.75)] text-nowrap">
          <p className="leading-[normal]">
            Name<span className="text-black">*</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-tl-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[14px] relative w-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#303135] border-solid inset-0 pointer-events-none rounded-tl-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[5px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Product_Sans_Medium:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(48,49,53,0.75)] text-nowrap">
          <p className="leading-[normal]">Email Address</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative rounded-bl-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[14px] relative w-full">
          <Container3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#303135] border-solid inset-0 pointer-events-none rounded-bl-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start justify-center p-[10px] relative size-full">
          <Margin />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[120px] items-start justify-center min-h-px relative shrink-0 w-[285px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Product_Sans_Medium:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(48,49,53,0.75)] text-nowrap">
          <p className="leading-[normal]">
            Phone Number<span className="text-black">*</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="relative rounded-tr-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[14px] relative w-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#303135] border-solid inset-0 pointer-events-none rounded-tr-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[5px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Product_Sans_Medium:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(48,49,53,0.75)] text-nowrap">
          <p className="leading-[normal]">Zip Code</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="relative rounded-br-[5px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[14px] relative w-full">
          <Container12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#303135] border-solid inset-0 pointer-events-none rounded-br-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col items-start relative rounded-br-[5px] shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start justify-center p-[10px] relative size-full">
          <Margin1 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[120px] items-start justify-center min-h-px relative shrink-0 w-[285px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Product_Sans:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(48,49,53,0.75)] w-full">
          <p className="leading-[normal]">Type your message...</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="h-[100px] relative rounded-br-[5px] rounded-tr-[5px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-auto size-full">
        <div className="content-stretch flex items-start justify-center p-[17px] relative size-full">
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#222] border-solid inset-0 pointer-events-none rounded-br-[5px] rounded-tr-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col items-start relative rounded-br-[5px] rounded-tr-[5px] shrink-0 w-full" data-name="Container">
      <Textarea />
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-center flex flex-wrap items-center justify-center p-[10px] relative size-full">
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[120px] items-start justify-center min-h-px relative shrink-0 w-[342px]" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative">
        <div className="flex flex-col font-['Product_Sans_Black:Regular',product-sans] justify-center leading-[0] not-italic relative shrink-0 text-[#303135] text-[13px] text-center text-nowrap">
          <p className="leading-[normal]">SUBMIT</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center max-w-[208px] px-[32px] py-[17px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#35363a] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_2px_5px_0px_#535458]" />
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-center flex flex-wrap gap-0 items-center justify-center p-[10px] relative size-full">
          <Container24 />
          <div className="absolute flex flex-col font-['Product_Sans_Light:Regular',product-sans] justify-center leading-[0] left-[114.07px] not-italic text-[#303135] text-[13px] text-center top-[99.14px] translate-x-[-50%] translate-y-[-50%] w-[112.18px]">
            <p className="leading-[normal]">Powered by Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[120px] items-start justify-center min-h-px relative shrink-0 w-[228px]" data-name="Container">
      <Container25 />
    </div>
  );
}

function FormSection() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[152px] items-start left-[20.4px] right-[-0.4px] top-[0.5px]" data-name="Form → Section">
      <Container8 />
      <Container16 />
      <Container21 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[20px] py-0 relative size-full">
          <FormSection />
        </div>
      </div>
    </div>
  );
}

function Group33Margin() {
  return <div className="h-[103px] shrink-0 w-[870px]" data-name="Group - 3 / 3:margin" />;
}

function Container28() {
  return <div className="absolute h-[161px] left-0 top-0 w-[860px] z-[1]" data-name="Container" />;
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col h-[103px] isolate items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
    </div>
  );
}

function Group() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-[860px]" data-name="Group - 1 / 3">
      <Container29 />
    </div>
  );
}

function Group13Margin() {
  return (
    <div className="content-stretch flex flex-col h-[103px] items-start justify-center pl-0 pr-[10px] py-0 relative shrink-0 w-[870px]" data-name="Group - 1 / 3:margin">
      <Group />
    </div>
  );
}

function Group23Margin() {
  return <div className="h-[103px] shrink-0 w-[870px]" data-name="Group - 2 / 3:margin" />;
}

function Margin2() {
  return (
    <div className="absolute h-[90px] left-[-2606.5px] right-[2204.5px] top-[11px]" data-name="Margin">
      <div className="absolute flex flex-col font-['PT_Sans:Italic',product-sans] italic justify-center leading-[0] left-[636px] text-[20px] text-black text-center top-[64px] translate-x-[-50%] translate-y-[-50%] w-[751.742px]">
        <p className="leading-[26px]">“Deno and crew did a great job. They arrived on time and finished in a timely manner. Great price, professional and courteous. Would highly recommend his company.”</p>
      </div>
    </div>
  );
}

function Group13Margin1() {
  return (
    <div className="h-[103px] relative shrink-0 w-[870px]" data-name="Group - 1 / 3:margin">
      <Margin2 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex items-start left-[-870px] right-[-2620px] top-[calc(50%-20px)] translate-y-[-50%]" data-name="Container">
      <Group33Margin />
      <Group13Margin />
      <Group23Margin />
      <Group33Margin />
      <Group13Margin1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="SVG">
          <path d={svgPaths.p63ffa80} fill="var(--fill-0, #EDEDED)" fillOpacity="0.9" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonNextSlide() {
  return (
    <div className="absolute content-stretch flex items-start right-[-150px] top-[39px]" data-name="Button - Next slide">
      <Svg />
    </div>
  );
}

function RegionSlides() {
  return (
    <div className="h-[143px] overflow-clip relative shrink-0 w-[1280px]" data-name="Region - Slides">
      <Container30 />
      <ButtonNextSlide />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bottom-[5px] content-stretch flex gap-[12px] items-start left-0 px-[563px] py-[7px] w-[1285px]" data-name="Container">
      <div className="absolute bg-black left-[615.5px] rounded-[5px] size-[10px] top-[7px]" data-name="Button - Go to slide 1" />
      <div className="absolute bg-black left-[637.5px] opacity-20 rounded-[5px] size-[10px] top-[7px]" data-name="Button - Go to slide 2" />
      <div className="absolute bg-black left-[659.5px] opacity-20 rounded-[5px] size-[10px] top-[7px]" data-name="Button - Go to slide 3" />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col h-[176px] items-center relative shrink-0 w-full" data-name="Container">
      <RegionSlides />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[176px] left-[3px] top-[165px] w-[1289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="absolute flex flex-col font-['Montserrat:Italic',product-sans] font-normal italic justify-center leading-[0] left-[647.5px] text-[0px] text-black text-center text-nowrap top-0 translate-x-[-50%] translate-y-[-50%]">
          <p className="font-['Product_Sans:Bold',product-sans] leading-[26px] mb-0 not-italic text-[20px]">{`“Great price, professional and courteous.” `}</p>
          <p className="font-['Product_Sans:Regular',product-sans] leading-[26px] not-italic">
            <span className="text-[15px]">--</span>
            <span className="text-[20px]">T. Bradley</span>
          </p>
        </div>
        <Container32 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[341px] left-1/2 top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[1292px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="absolute flex flex-col font-['Product_Sans:Bold',product-sans] justify-center leading-[28px] left-[646px] not-italic text-[#323232] text-[0px] text-[24px] text-center text-nowrap top-[88.69px] translate-x-[-50%] translate-y-[-50%]">
          <p className="font-['Product_Sans:Regular',product-sans] mb-0">{`TAKE IT FROM OUR `}</p>
          <p>VALUED CUSTOMERS</p>
        </div>
        <div className="absolute h-[1.25px] left-[91.39px] top-[88.69px] w-[319.5px]" data-name="Horizontal Divider">
          <div aria-hidden="true" className="absolute border-[#8b8b92] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none" />
        </div>
        <div className="absolute flex h-[1.25px] items-center justify-center left-[881.11px] top-[88.69px] w-[319.5px]">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[1.25px] relative w-[319.5px]" data-name="Horizontal Divider">
              <div aria-hidden="true" className="absolute border-[#8b8b92] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="absolute left-[629.07px] size-[32.5px] top-[16px]" data-name="verified">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[114.8%] left-[-7.69%] max-w-none top-[-7.65%] w-[115.38%]" src={imgVerified} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[342px] items-start left-0 p-[3px] top-[278px] w-[1292px]" data-name="Section">
      <div aria-hidden="true" className="absolute border-[#303135] border-[3px] border-solid inset-0 pointer-events-none shadow-[0px_1px_0px_0px_rgba(17,17,26,0.05),0px_0px_8px_0px_rgba(17,17,26,0.1)]" />
      <Container33 />
      <Container34 />
    </div>
  );
}

function ReferenceSection() {
  return (
    <div className="absolute contents left-0 top-[278px]" data-name="Reference Section">
      <Section />
    </div>
  );
}

export default function FormFiller() {
  return (
    <div className="bg-[#f7bd15] relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="Form Filler">
      <div aria-hidden="true" className="absolute border-[#303135] border-[0px_3px] border-solid inset-0 pointer-events-none rounded-tl-[20px] rounded-tr-[20px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-0 pt-[68px] px-[10px] relative size-full">
          <Container27 />
          <div className="absolute flex flex-col font-['Product_Sans_Light:Regular',product-sans] justify-center leading-[0] left-[40.55px] not-italic text-[#303135] text-[12px] text-nowrap top-[248.21px] translate-y-[-50%]">
            <p className="leading-[normal]">*Required</p>
          </div>
          <div className="absolute bg-[rgba(255,255,255,0.5)] h-[70.484px] left-[0.71px] rounded-tl-[20px] rounded-tr-[20px] top-[0.09px] w-[1290.844px]">
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-tl-[20px] rounded-tr-[20px]" />
          </div>
          <div className="absolute flex flex-col font-['Product_Sans:Regular',product-sans] h-[31.971px] justify-center leading-[0] left-[calc(50%+0.55px)] not-italic text-[#222] text-[24px] text-center text-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] top-[35.34px] translate-x-[-50%] translate-y-[-50%] uppercase w-[700px]">
            <p className="leading-[10px]">
              <span>{`Send us a message & GET a `}</span>
              <span className="font-['Product_Sans:Bold',product-sans] not-italic">free estimate</span>
              <span>{` within `}</span>
              <span className="font-['Product_Sans:Bold',product-sans] not-italic">24 hours</span>
            </p>
          </div>
          <div className="absolute left-[1118.4px] size-[20px] top-[224.5px]" data-name="Gmail">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgGmail} />
          </div>
          <ReferenceSection />
        </div>
      </div>
    </div>
  );
}