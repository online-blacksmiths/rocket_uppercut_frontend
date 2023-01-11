import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import signup from 'assets/create.svg';
import google from 'assets/google.svg';
import facebook from 'assets/facebook_login.svg';

import Layout from 'common/Layout';
import SignupForm from './signupForm';
import useSignup from './hook/useSignup';
import FullButton from 'components/FullButton';

export default function Signup() {
  const [type, setType] = useState<string>('');
  const [isForm, setIsForm] = useState<boolean>(false);

  const location = useLocation();
  const pathname = useMemo(() => {
    if (location.pathname === '/signup') {
      return true;
    } else {
      return false;
    }
  }, [location.pathname]);

  const { handleEmailSignup, handlePhoneSignup } = useSignup({ type, setType, setIsForm });

  return (
    <Layout title={pathname ? '회원가입' : null}>
      <section className="w-full h-[510px] flex justify-between mt-20 mb-40">
        <img src={signup} alt="signup" className="px-20" />
        <article className="w-full h-[680px] flex flex-col px-20 space-y-3">
          <h2 className="text-3xl">일로 연결되는 사람들,</h2>
          <h1 className="text-3xl font-bold">로켓어퍼컷</h1>
          <div className="flex space-x-1">
            <span className="text-sm text-[#28323c]">이미 회원이신가요?</span>
            <Link to="/login" className="text-sm text-[#4E61FF] ">
              로그인
            </Link>
          </div>
          {isForm ? (
            <SignupForm type={type} setType={setType} setIsForm={setIsForm} />
          ) : (
            <>
              <div className="space-y-2">
                <button className="w-full">
                  <div className="flex w-full">
                    <div className="w-10 h-10 aspect-square flex justify-center items-center border rounded-l-md bg-white left-0">
                      <img src={google} alt="google_login" className="w-4 h-4" />
                    </div>
                    <div className="w-full h-10 flex justify-center items-center bg-[#3a83f9] border border-l-0 rounded-r-md overflow-hidden">
                      <span className="text-white text-sm font-bold">구글로 회원가입</span>
                    </div>
                  </div>
                </button>
                <button className="w-full">
                  <div className="flex w-full">
                    <div className="w-10 h-10 aspect-square flex justify-center items-center border rounded-l-md bg-white left-0">
                      <img src={facebook} alt="facebook-login" className="w-4 h-4" />
                    </div>
                    <div className="w-full h-10 flex justify-center items-center bg-[#2c53ab] border border-l-0 rounded-r-md overflow-hidden">
                      <span className="text-white text-sm font-bold">페이스북으로 회원가입</span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="py-3">
                <div className="relative border-b flex justify-center mx-10">
                  <span className="bg-white absolute -top-3 px-4 text-sm text-gray-500">or</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <FullButton
                  onClick={handlePhoneSignup}
                  text="휴대전화로 회원가입"
                  bgColor="white"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                  }
                />
                <FullButton
                  onClick={handleEmailSignup}
                  text="이메일로 회원가입"
                  bgColor="white"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  }
                />
              </div>
            </>
          )}

          <span className="text-sm text-gray-600 py-3 border-b">만 14세 미만은 가입할 수 없습니다.</span>
          <div className="text-xs text-gray-600">
            업무와 연관된 다양한 사람들을 만날 수 있는 <br />
            <span className="text-gray-700 underline font-bold">로켓어퍼컷 App</span>을 준비중입니다.
          </div>
        </article>
      </section>
    </Layout>
  );
}
