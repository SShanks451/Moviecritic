"use client";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ReviewCard({ id, comment, rating, name }: { id: string; comment: string; rating: number; name: string }) {
  const router = useRouter();

  return (
    <div className="border-2 border-gray-400 my-8">
      <div className="flex justify-between px-10 pt-5 text-lg">
        <div>{comment}</div>
        <div className="text-[#6558f5]">{rating}/10</div>
      </div>
      <div className="flex justify-between mt-6 px-10 pb-5 text-md">
        <div className="italic">By {name}</div>
        <div className="flex justify-end">
          <FaEdit
            className="ml-3 cursor-pointer"
            size={20}
            color="gray"
            onClick={() => {
              router.push(`/reviews/${id}/update`);
            }}
          />
          <MdDelete
            className="ml-3 cursor-pointer"
            size={20}
            color="gray"
            onClick={async () => {
              await axios.delete(`/api/reviews/${id}`);
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
}
