import { useState } from 'react';

import { SignupProps } from './types';
import useSignup from './hook/useSignup';

import allCountry, { iso2FlagEmoji } from 'utils/allCountry';
import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import FullButton from 'components/FullButton';

export default function SignupForm({ type, setType, setIsForm }: SignupProps) {
  const [selectedDialCode, setSelectedDialCode] = useState<string>('+82');
  const [selectedIso, setSelectedIso] = useState<string>('kr');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [termsAgree, setTermsAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);
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
      <div>
        <button onClick={() => handleChangeType()} className="">
          <span className="text-xs text-gray-600 underline">{type === 'phone' ? '이메일' : '휴대전화'}로 가입</span>
        </button>
      </div>
      <form className="mt-1 space-y-2">
        {type === 'phone' ? (
          //! 휴대전화
          <div className="w-full flex space-x-2">
            <div className="relative w-28 h-10">
              <button
                type="button"
                onClick={() => handleDropdown()}
                className="w-full h-full border rounded px-4 flex items-center space-x-3"
              >
                <span>{iso2FlagEmoji(selectedIso)}</span>
                <span className="text-sm">{selectedDialCode}</span>
                <span className="text-xs text-gray-500">▼</span>
              </button>
              {showDropdown && (
                <ul className="absolute min-w-[310px] w-full h-80 overflow-y-scroll border bg-white rounded-md ">
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
            <TextInput type="text" placeholder="휴대전화 번호" />
          </div>
        ) : (
          //! 이메일
          <div>email</div>
        )}
        <TextInput type="password" placeholder="비밀번호" />
        <div className="grid grid-cols-2 gap-2">
          <TextInput type="text" placeholder="성" />
          <TextInput type="text" placeholder="이름" />
        </div>
        <div className="space-y-2 flex justify-between items-baseline">
          <div className="flex flex-col space-y-3">
            <Checkbox id="terms" isChecked={termsAgree} setIsChecked={setTermsAgree} text="이용 약관 동의" />
            <Checkbox
              id="privacy"
              isChecked={privacyAgree}
              setIsChecked={setPrivacyAgree}
              text="개인정보취급방침 동의"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <span className="text-sm underline">보기</span>
            <span className="text-sm underline">보기</span>
          </div>
        </div>
        <FullButton
          type="submit"
          onClick={() => {
            console.log('test');
          }}
          text="회원가입"
          bgColor="blue"
        />
      </form>
    </div>
  );
}
