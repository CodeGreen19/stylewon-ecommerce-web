import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="text-xl font-semibold">Logo</div>
    </Link>
  );
}
