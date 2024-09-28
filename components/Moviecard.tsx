"use client";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Moviecard({ id, name, releaseDate, rating }: { name: string; releaseDate: string; rating: number; id: string }) {
  const router = useRouter();

  return (
    <div className="bg-[#e0defd] w-[30%] px-10 pt-10 pb-4 ">
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push(`/movies/${id}`);
        }}
      >
        <h1 className="font-medium text-2xl">{name}</h1>
        <p className="mt-3 text-lg italic">Released: {releaseDate}</p>
        <h2 className="mt-3 font-semibold text-lg">Rating: {rating ? rating : "-"}/10</h2>
      </div>

      <div className="flex justify-end mt-2 pl-40">
        <FaEdit
          className="ml-3 cursor-pointer"
          size={20}
          color="gray"
          onClick={() => {
            router.push(`/movies/${id}/update`);
          }}
        />
        <MdDelete
          className="ml-3 cursor-pointer"
          size={20}
          color="gray"
          onClick={async () => {
            await axios.delete(`/api/movies/${id}`);
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}
