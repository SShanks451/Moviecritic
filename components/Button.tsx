import { ReactNode } from "react";

export default function Button({
  children,
  backgorund = "purple",
  onClick,
  buttonType = "button",
}: {
  children: ReactNode;
  backgorund?: "purple" | "white";
  onClick?: () => void;
  buttonType?: "button" | "submit";
}) {
  return (
    <button
      type={buttonType}
      className={`mx-2 px-7 font-semibold text-lg py-2 rounded-md ${
        backgorund === "white" ? "text-[#6558f5] bg-white border border-[#6558f5]" : "bg-[#6558f5] text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
