import Link from "next/link";

export default function AboutPage() {
  const name = "Hello About";
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-24 text-center">
      <div>
        <h1>이 페이지는 app/about/page.tsx입니다.</h1>
        <p>{name}</p>

        <Link href="/"> Home으로 이동하기</Link>
      </div>
    </div>
  );
}
