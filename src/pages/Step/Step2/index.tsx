import userDefaultPhoto from 'assets/user.webp';

import Layout from 'common/Layout';
import FullButton from 'components/FullButton';

import StepDropdownInput from '../components/StepDropdownInput';
import StepNav from '../components/StepNav';
import StepHead from '../components/StepHead';

export default function Step2() {
  return (
    <Layout title="프로필">
      <StepNav />
      <article className="flex flex-col items-center">
        <h1 className="mt-10 mb-2 text-xl text-[#28323c]">/이름값/님 반가워요</h1>
        <span className="mt-3 mb-6 text-xs text-[#6e7980]">
          프로필을 입력하고 업무, 채용, 커리어 이야기 등을 나눠보세요.
        </span>
        <img src={userDefaultPhoto} alt="userDefaultPhoto" className="mb-3" />
        <FullButton bgColor="blue" text="사진 등록" />
        <div className="w-full flex flex-col space-y-3 mt-5">
          <div>
            <StepHead content="최근 포지션" isRequire={true} />
            <StepDropdownInput />
          </div>
          <div>
            <StepHead content="가장 최근에 다닌 회사" isRequire={true} />
            <StepDropdownInput />
          </div>
        </div>
        <div className="w-full flex flex-col my-3">
          <h3 className="text-sm text-[#28323c] mb-1">관심분야</h3>
          <div className="h-[50px] py-2 px-3 relative border rounded-md group">
            <input
              type="text"
              placeholder="예: 프론트엔드 개발"
              className="w-full h-full pl-7 border-b text-sm outline-none transition-colors focus:border-[#4E61FF] "
            />
            <div className="absolute left-0 top-0 w-12 h-12 flex justify-center items-center">
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
        </div>
        <div className="w-full">
          <StepHead content="학교" isRequire={false} />
          <StepDropdownInput />
        </div>
        <div className="w-full mt-5 space-y-5">
          <FullButton bgColor="white" text="학생입니다" />
          <FullButton bgColor="blue" text="다음" />
        </div>
      </article>
    </Layout>
  );
}
