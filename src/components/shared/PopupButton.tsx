"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PopupButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deleteSearchParam = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("isOpen");
    params.delete("id");
    params.delete("winner");

    router.replace(pathname + "?" + params.toString());
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
