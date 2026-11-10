import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getOrder } from "@/lib/orders";

type Props = { params: Promise<{ id: string }> };

// 주문 상세는 URL의 id만으로 조회하므로, "이 주문이 로그인한 사용자
// 본인의 것인지"를 반드시 서버에서 다시 확인해야 합니다. 이 확인이
// 없으면 다른 사람의 주문 id를 주소창에 넣는 것만으로 남의 주문을 볼 수
// 있는 IDOR 취약점이 됩니다. 남의 주문은 "권한 없음"(403)이 아니라
// "없음"(404)으로 보여줘서, 그 id의 주문이 존재하는지조차 알려주지 않습니다.
// (9주차 공지 삭제와 같은 패턴 — 본인 또는 admin만 허용)
export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }

  const isOwner = order.userId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    notFound(); // 403이 아니라 404!
  }

  return (
    <div className="mx-auto max-w-2xl flex-1 px-8 py-16">
      <Link href="/orders" className="text-sm text-zinc-500 hover:underline">
        ← 주문 내역
      </Link>
      <h1 className="mb-2 mt-4 text-2xl font-semibold text-black dark:text-zinc-50">
        주문 상세
      </h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        {new Date(order.createdAt).toLocaleString("ko-KR")}
      </p>

      <ul className="flex flex-col gap-3">
        {order.items.map((item) => (
          <li
            key={item.productId}
            className="flex items-center justify-between rounded-lg border border-black/[.08] px-5 py-4 dark:border-white/[.145]"
          >
            <div>
              <p className="font-medium text-black dark:text-zinc-50">
                {item.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.price.toLocaleString()}원 × {item.qty}
              </p>
            </div>
            <p className="text-sm font-medium text-black dark:text-zinc-50">
              {(item.price * item.qty).toLocaleString()}원
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 border-t border-black/[.08] pt-6 text-right text-lg font-semibold text-black dark:border-white/[.145] dark:text-zinc-50">
        총 {order.total.toLocaleString()}원
      </p>
    </div>
  );
}
