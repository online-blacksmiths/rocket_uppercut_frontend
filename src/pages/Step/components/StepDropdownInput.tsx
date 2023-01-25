export default function StepDropdownInput() {
  return (
    <div className="relative w-full h-11 group">
      <input
        type="text"
        className="w-full h-full border text-sm pl-10 outline-none rounded-md focus:border-[#4e61ff] transition-colors"
      />
      <div className="absolute left-0 top-0 w-11 h-11 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-4 h-4 text-gray-500 group-hover:text-[#a6b2ff]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
}
