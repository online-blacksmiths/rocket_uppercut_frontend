type TextInputProps = {
  type: 'text' | 'password' | 'email';
  placeholder: string;
};

export default function TextInput({ type, placeholder }: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 border rounded-md text-sm px-3 placeholder:text-gray-300 outline-none focus:border-[#4E61FF] transition-colors focus:placeholder:text-gray-400"
    />
  );
}
