import { useState } from 'react';

import { SignupProps } from './types';
import useSignup from './hook/useSignup';

import allCountry, { iso2FlagEmoji } from 'utils/allCountry';

export default function SignupForm({ type, setType, setIsForm }: SignupProps) {
  const [selectedDialCode, setSelectedDialCode] = useState<string>('+82');
  const [selectedIso, setSelectedIso] = useState<string>('kr');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { handleChangeType } = useSignup({ type, setType, setIsForm });

  const handleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleChangeTel = (dialCode: string, iso: string) => {
    setSelectedDialCode(`+${dialCode}`);
    setSelectedIso(iso);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => handleChangeType()} className="">
        <span className="text-xs text-gray-600 underline">{type === 'phone' ? '이메일' : '휴대전화'}로 가입</span>
      </button>
      <form>
        {type === 'phone' ? (
          //! 휴대전화
          <div className="relative w-28 h-10">
            <button
              type="button"
              onClick={() => handleDropdown()}
              className="w-full h-full border rounded px-4 flex items-center space-x-3"
            >
              <span>{iso2FlagEmoji(selectedIso)}</span>
              <span className="text-sm">{selectedDialCode}</span>
            </button>
            {showDropdown && (
              <ul className="absolute w-72 h-80 overflow-y-scroll border bg-white rounded-md ">
                {allCountry().map(item => (
                  <li
                    onClick={() => {
                      if (typeof item.iso2 === 'string' && typeof item.dialCode === 'string') {
                        handleChangeTel(item.dialCode, item.iso2);
                      }
                    }}
                    className="h-10 flex items-center hover:bg-gray-200 first:border-b-2 px-2 cursor-pointer space-x-2"
                  >
                    <span>{typeof item.iso2 === 'string' ? iso2FlagEmoji(item.iso2) : null}</span>
                    <span className="text-gray-900 text-sm">{item.name}</span>
                    <span className="text-gray-900 text-sm">+{item.dialCode}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          //! 이메일
          <div>email</div>
        )}
      </form>
    </div>
  );
}
