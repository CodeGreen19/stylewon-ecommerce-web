import Image from "next/image";

export function Hero() {
  return (
    <div className="m-auto max-w-5xl p-2 lg:p-0 lg:pt-4">
      <Image
        className="w-full rounded-sm object-contain"
        src={"/banner-daraz.avif"}
        height={300}
        width={900}
        alt="banner"
      />
    </div>
  );
}
