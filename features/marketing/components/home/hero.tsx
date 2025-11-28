import Image from "next/image";

export default function Hero() {
  return (
    <div className=" max-w-5xl m-auto p-2 lg:p-0 lg:pt-4">
      <Image
        className="object-contain w-full rounded-sm"
        src={"/banner-daraz.avif"}
        height={300}
        width={900}
        alt="banner"
      />
    </div>
  );
}
