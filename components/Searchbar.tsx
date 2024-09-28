export default function Searchbar({ value, onChange }: { value: string; onChange: (e: any) => void }) {
  return (
    <input
      type="text"
      placeholder="Search for your favourite movie"
      className="font-sans font-normal text-xl py-2 px-3 border-2 rounded-sm w-[35%] border-[#6558f5]"
      value={value}
      onChange={onChange}
    />
  );
}
