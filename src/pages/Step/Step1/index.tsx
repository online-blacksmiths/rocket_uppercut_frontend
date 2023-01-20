import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import { emailState, phoneState, selectedDialCodeState } from 'atom/signup';

import Layout from 'common/Layout';
import { StepResType } from 'pages/Signup/types';
import StepNav from '../components/StepNav';
import FullButton from 'components/FullButton';

export default function Step1() {
  const [timer, setTimer] = useState<string>('5:00');
  const [deadline, setDeadline] = useState<number>(new Date().setSeconds(new Date().getSeconds() + 300));
  const [authCode, setAuthCode] = useState<string>('');
  const [fetch, setFetch] = useState<boolean>(false);
  const dialCode = useRecoilValue(selectedDialCodeState);
  const phone = useRecoilValue(phoneState);
  const email = useRecoilValue(emailState);

  const localData: StepResType = JSON.parse(localStorage.getItem('step') || '');

  const cookies = new Cookies();
  const navigate = useNavigate();
  const accessToken = cookies.get('accessToken');

  const handleGetAuthCode = () => {
    const newDate = new Date();
    setTimer('5:00');
    setDeadline(newDate.setSeconds(newDate.getSeconds() + 300));
  };

  const { refetch } = useQuery(
    'requestAuthCode',
    async () => {
      console.log('인증번호 요청');
      try {
        const res = await axios.get('/api/v1/user/verify/phone', {
          headers: {
            Authorization: cookies.get('accessToken'),
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: false,
    },
  );

  const { mutate, status } = useMutation<{ message: string }>(
    async () => {
      try {
        console.log(authCode, 'request');
        const res = await axios.post(
          '/api/v1/user/verify/phone',
          {
            verify_code: authCode,
          },
          {
            headers: {
              Authorization: accessToken,
            },
          },
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        if (status === 'success') {
          setFetch(true);
        }
      },
    },
  );

  useQuery<StepResType>(
    'getStep',
    async () => {
      try {
        const res = await axios.get('/api/v1/user/verify/step', {
          headers: {
            Authorization: accessToken,
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

  const handleAuthorization = () => {
    mutate();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setAuthCode('');
    }

    if (/([\d])/.exec(e.target.value) !== null && e.target.value.length <= 6) {
      setAuthCode(e.target.value);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      const total = deadline - Date.parse(new Date().toString());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);

      if (total >= 0) setTimer(`${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`);
    }, 1000);
    return () => clearInterval(countdown);
  }, [deadline]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout title="회원가입">
      <section className="w-[700px] flex flex-col items-center">
        <StepNav />
        {localData.type === 'PHONE' ? (
          <article className="flex flex-col justify-center">
            <p className="mt-10 mb-5 text-center text-xl text-[#28323c]">휴대전화 인증</p>
            <div className="w-[340px] flex flex-col items-center space-y-1">
              <span className="text-sm text-[#6e7980]">
                {dialCode} {phone.slice(1, 3)}-{phone.slice(3, 7)}-{phone.slice(7, phone.length)}로 보내드린 인증번호를
                입력하세요.
              </span>
              <button className="text-sm text-[#4e61ff] hover:underline">
                <p>전화번호 수정</p>
              </button>
            </div>
            <div className="w-full flex mt-4 relative items-center">
              <input
                type="text"
                placeholder="인증 번호 6자리 입력"
                className="w-full h-10 border rounded-md py-3 px-4 outline-none text-sm"
                value={authCode}
                onChange={e => handleChange(e)}
              />
              <div className="absolute right-4 text-sm text-[#ff5165]">{timer}</div>
            </div>
            <div className="flex justify-center my-8">
              {timer !== '00:00' ? (
                <span className="text-sm text-[#6e7980]">인증번호를 못 받으셨나요?</span>
              ) : (
                <span className="text-sm text-[#6e7980]">인증 유효시간을 초과했습니다. 다시 시도해 주세요</span>
              )}
              <button onClick={() => handleGetAuthCode()} className="ml-2 text-sm text-[#4e61ff] hover:underline">
                <p>다시받기</p>
              </button>
            </div>
            <FullButton
              onClick={handleAuthorization}
              bgColor="blue"
              text="인증"
              disable={timer === '0:00' ? false : true}
            />
          </article>
        ) : (
          <div>Email Step 1</div>
        )}
      </section>
    </Layout>
  );
}
