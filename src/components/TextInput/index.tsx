import { ChangeEvent } from 'react';

type TextInputProps = {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function TextInput({ type, placeholder, name, onChange, value }: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={e => onChange(e)}
      value={value}
      className="w-full h-10 border rounded-md text-sm px-3 placeholder:text-gray-300 outline-none focus:border-[#4E61FF] transition-colors focus:placeholder:text-gray-400"
    />
  );
}
