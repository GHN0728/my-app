import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { registerAction } from "@/lib/actions";

// registerAction이 비밀번호를 bcrypt로 해싱해 저장한 뒤 바로 로그인까지
// 처리합니다. 브라우저의 minLength는 사용자 편의일 뿐이고, 실제 검증
// (8자 이상, 중복 이메일)은 서버 쪽 registerAction / createUser가 합니다.
export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        회원가입
      </h1>
      <form action={registerAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            비밀번호 (8자 이상)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <SubmitButton label="가입하기" />
      </form>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="underline underline-offset-4">
          로그인
        </Link>
      </p>
    </div>
  );
}
