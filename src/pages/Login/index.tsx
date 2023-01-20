import Layout from 'common/Layout';
import login from 'assets/login.svg';
import google from 'assets/google.svg';
import facebook from 'assets/facebook_login.svg';

import Navigator from 'components/Navigator';
import TextInput from 'components/TextInput';
import { ChangeEvent, useState } from 'react';
import FullButton from 'components/FullButton';
import { Link } from 'react-router-dom';

type userInputType = {
  id: string;
  password: string;
};

export default function Login() {
  const [input, setInput] = useState<userInputType>({
    id: '',
    password: '',
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title="로그인">
      <Navigator />
      <section className="w-full h-[510px] flex justify-between mt-20 mb-40">
        <img src={login} alt="signup" className="px-20" />
        <article className="w-full h-[680px] flex flex-col px-20">
          <h2 className="text-3xl">일로 연결되는 사람들,</h2>
          <h1 className="text-3xl font-bold mt-3">로켓어퍼컷</h1>
          <div className="text-xs my-6 leading-5 text-[#6e7980]">
            업무와 연관된 다양한 사람들을 만날 수 있는 <span className="font-bold underline">로켓어퍼컷 App</span>을{' '}
            <br /> 준비중입니다. 채용 정보를 보시려면 아래로 로그인해주세요.
          </div>
          <form className="space-y-2">
            <TextInput
              type="email"
              name="id"
              onChange={handleInput}
              value={input.id}
              placeholder="휴대전화 번호 혹은 이메일"
            />
            <TextInput
              type="password"
              name="password"
              onChange={handleInput}
              value={input.password}
              placeholder="비밀번호"
            />
            <span>
              <button type="button">
                <p className="text-xs underline text-[#6e7980]">비밀번호 찾기</p>
              </button>
            </span>
            <FullButton type="submit" bgColor="blue" text="로그인" />
          </form>
          <div className="relative border-b border-gray-300 my-4 flex justify-center mx-10">
            <span className="absolute -bottom-2.5 bg-white text-sm text-gray-400 px-5">or</span>
          </div>
          <div className="flex flex-col my-2 gap-2">
            <button
              type="button"
              className="group w-full h-10 border rounded-md relative flex justify-center items-center transition-colors bg-white hover:border-[#4E61FF]"
            >
              <img src={google} alt="google" className="w-5 h-5 pr-1" />
              <span className="text-sm transition-colors text-gray-600 group-hover:text-[#4E61FF]">구글로 로그인</span>
            </button>
            <button
              type="button"
              className="group w-full h-10 border rounded-md relative flex justify-center items-center transition-colors bg-white hover:border-[#4E61FF]"
            >
              <img src={facebook} alt="facebook" className="w-4 h-4 pr-1" />
              <span className="text-sm transition-colors text-gray-600 group-hover:text-[#4E61FF]">
                페이스북으로 로그인
              </span>
            </button>
          </div>
          <div className="w-full border-b border-gray-300 my-4" />
          <div className="flex text-sm justify-center text-[#28323c] space-x-1">
            <span>회원이 아니신가요?</span>
            <Link to="/signup" className="text-[#4e61ff] underline">
              회원가입
            </Link>
          </div>
        </article>
      </section>
    </Layout>
  );
}
