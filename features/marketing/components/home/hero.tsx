import Image from "next/image";

export function Hero() {
  return (
    <div className="m-auto max-w-5xl lg:pt-4">
      <Image
        className="w-full object-contain lg:rounded-sm"
        src={"/banner-daraz.avif"}
        height={300}
        width={900}
        alt="banner"
      />
    </div>
  );
}
