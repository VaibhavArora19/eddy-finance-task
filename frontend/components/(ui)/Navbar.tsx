"use client";

import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between px-8 py-4">
      <div className="text-2xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
        <h1>XSwap</h1>
      </div>
      <div className="flex gap-8">
        <h2 className="mt-2 cursor-pointer hover:text-gray-200" onClick={() => router.push("/history")}>
          History
        </h2>
        <appkit-button />
      </div>
    </div>
  );
}

export default Navbar;
