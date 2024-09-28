"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Appbar() {
  const router = useRouter();

  return (
    <div className="w-[100%] border border-b flex justify-between py-5 items-center px-8 bg-[#e3e8ed] font-sans font-medium">
      <h1
        className="text-xl cursor-pointer"
        onClick={() => {
          router.push("/movies");
        }}
      >
        MOVIECRITIC
      </h1>
      <div>
        <Button
          backgorund="white"
          onClick={() => {
            router.push("/movies/create");
          }}
        >
          Add new movie
        </Button>
        <Button
          onClick={() => {
            router.push("/reviews/create");
          }}
        >
          Add new review
        </Button>
      </div>
    </div>
  );
}
