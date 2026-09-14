"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-amber-600 px-4 py-2
      rounded-2x1"
      onClick={() => setCount((c) => c + 1)}
    >
      {count}{" "}
    </button>
  );
}
