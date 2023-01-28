import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { DateTime } from 'luxon';

import { SignupInputTypes, SignupMutateDataType, SignupProps, SignupResTypes, StepResType } from './types';
import useSignup from './hook/useSignup';
import useSignupForm from './hook/useSignupForm';
import allCountry, { iso2FlagEmoji } from 'utils/allCountry';
import { passwordRegExp, emailRegExp } from 'utils/regExp';
import { selectedDialCodeState, phoneState, emailState, selectedIsoState } from 'atom/signup';

import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import FullButton from 'components/FullButton';

export default function SignupForm({ type, setType, setIsForm }: SignupProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [termsAgree, setTermsAgree] = useState<boolean>(false);
  const [fetch, setFetch] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);
  const [mutateData, setMutateData] = useState<SignupMutateDataType>({
    password: '',
    first_name: '',
    last_name: '',
    is_terms_of_service: false,
    is_privacy_statement: false,
  });
  const [input, setInput] = useState<SignupInputTypes>({
    password: '',
    firstName: '',
    lastName: '',
  });

  const [selectedDialCode, setSelectedDialCode] = useRecoilState(selectedDialCodeState);
  const [selectedIso, setSelectedIso] = useRecoilState(selectedIsoState);
  const [phone, setPhone] = useRecoilState(phoneState);
  const [email, setEmail] = useRecoilState(emailState);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const { handleChangeType } = useSignup({ type, setType, setIsForm });

  const { handleDropdown, handleChangeTel, handleChangeForm, handleChangeInput, handleChangeId } = useSignupForm({
    setIsForm,
    setShowDropdown,
    setSelectedDialCode,
    setSelectedIso,
    input,
    setInput,
    type,
    setPhone,
    setEmail,
  });

  const { mutate, data: signupData } = useMutation<SignupResTypes>(
    async () => {
      if (input.password.search(passwordRegExp) < 0) {
        alert('비밀번호 형식이 올바르지 않습니다.');
        return;
      }

      if (email.search(emailRegExp) < 0) {
        alert('이메일 형식이 올바르지 않습니다.');
        return;
      }
      
        try {
          const res = await axios.post(`/api/v1/user/signup/${type === 'phone' ? 'phone' : 'email'}`, mutateData);
          return res.data;
        } catch (error) {
          console.log(error);
        }
    },
    {
      onSuccess: data => {
        cookies.set('refreshToken', data.refresh_token, {
          expires: DateTime.fromISO(data.expired_date).toJSDate(),
        });

        cookies.set('accessToken', data.access_token, {
          expires: DateTime.fromISO(data.expired_date).toJSDate(),
        });
        setFetch(true);
      },
    },
  );

  useQuery<StepResType>(
    'getStep',
    async () => {
      if (signupData === undefined) return;
      try {
        const res = await axios.get('/api/v1/user/verify/step', {
          headers: {
            Authorization: signupData.access_token,
          },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      enabled: fetch,
      onSuccess: (data: StepResType) => {
        localStorage.setItem('step', JSON.stringify(data));

        if (!data.step_1) {
          navigate('/step1');
          return;
        }

        if (!data.step_2) {
          navigate('/step2');
          return;
        }

        if (!data.step_3) {
          navigate('/step3');
          return;
        }
      },
    },
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    const { password, firstName: first_name, lastName: last_name } = input;

    if (type === 'phone') {
      setMutateData({
        phone: `${selectedDialCode}${phone}`,
        password,
        first_name,
        last_name,
        is_terms_of_service: termsAgree,
        is_privacy_statement: privacyAgree,
      });
      return;
    }

    setMutateData({
      email,
      password,
      first_name,
      last_name,
      is_terms_of_service: termsAgree,
      is_privacy_statement: privacyAgree,
    });
  }, [input, termsAgree, privacyAgree, phone, email, selectedDialCode, type]);

  return (
    <div className="flex flex-col">
      <div>
        <button onClick={() => handleChangeType()} className="">
          <span className="text-xs text-gray-600 underline">{type === 'phone' ? '이메일' : '휴대전화'}로 가입</span>
        </button>
      </div>
      <form onSubmit={e => onSubmit(e)} className="mt-1 space-y-2">
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
                <ul className="absolute min-w-[310px] w-full h-80 overflow-y-scroll border bg-white rounded-md z-10">
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
            <TextInput type="text" onChange={handleChangeId} placeholder="휴대전화 번호" value={phone} />
          </div>
        ) : (
          //! 이메일
          <TextInput type="email" onChange={handleChangeId} placeholder="이메일" value={email} />
        )}
        <TextInput
          type="password"
          name="password"
          onChange={handleChangeInput}
          placeholder="비밀번호"
          value={input.password}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            type="text"
            name="firstName"
            onChange={handleChangeInput}
            placeholder="성"
            value={input.firstName}
          />
          <TextInput
            type="text"
            name="lastName"
            onChange={handleChangeInput}
            placeholder="이름"
            value={input.lastName}
          />
        </div>
        <div className="pb-5 space-y-2 flex justify-between items-baseline ">
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
        <div className="flex flex-col gap-6">
          <FullButton type="submit" text="회원가입" bgColor="blue" />
          <div className="border-t mx-10 relative flex justify-center">
            <span className="absolute -top-3 px-4 text-sm text-gray-500 bg-white">or</span>
          </div>
          <FullButton type="button" onClick={handleChangeForm} text="SNS로 회원가입" bgColor="white" />
        </div>
      </form>
    </div>
  );
}
