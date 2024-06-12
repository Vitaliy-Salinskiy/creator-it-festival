"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PopupButtonProps {
  chatId: number | null;
}

const PopupButton = ({ chatId }: PopupButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deleteSearchParam = async () => {
    const params = new URLSearchParams(searchParams);

    params.delete("isOpen");
    params.delete("id");
    params.delete("winner");
    params.delete("winnerId");
    params.delete("chatId");

    router.replace(pathname + "?" + params.toString());

    if (chatId) {
      await fetch(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_URL}/absent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
        }),
      });
    }
  };

  return (
    <button
      className="absolute top-[30px] right-10 cursor-pointer"
      onClick={deleteSearchParam}
    >
      <svg
        className="h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default PopupButton;
