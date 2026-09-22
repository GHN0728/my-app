"use server";

import { revalidatePath } from "next/cache";
import { likeProduct as likeProductInDb } from "@/lib/products";

export async function likeProductAction(id: string) {
  const newLikes = await likeProductInDb(id);
  // 이 경로를 다시 그리도록 Next.js에 알려줍니다 — 다른 탭/새로고침에서도
  // 최신 좋아요 수가 보이게 합니다.
  revalidatePath(`/products/${id}`);
  return newLikes;
}
