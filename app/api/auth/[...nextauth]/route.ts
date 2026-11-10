// Auth.js가 쓰는 내부 엔드포인트(/api/auth/session, /api/auth/callback/... 등)를
// 이 경로 하나로 받아서 auth.ts의 handlers에 넘겨줍니다.
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
