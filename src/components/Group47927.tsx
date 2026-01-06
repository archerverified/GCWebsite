import imgGarageCowboy from "figma:asset/fce6836bcb99568ff9db38777d36435b1e9708aa.png";

export function Group47927() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Logo Image - centered */}
      <div className="w-full max-w-4xl mx-auto mb-4">
        <img 
          alt="Garage Cowboy" 
          className="w-full h-auto object-contain mx-auto" 
          src={imgGarageCowboy} 
        />
      </div>
      {/* Title Text - centered */}
      <p 
        className="leading-[42px] text-3xl md:text-4xl lg:text-[56px] text-center text-[#323232] w-full"
        style={{
          fontFamily: '"Product Sans"',
          fontWeight: 500,
        }}
      >
        GARAGE DOOR & REPAIR SERVICES
      </p>
    </div>
  );
}
