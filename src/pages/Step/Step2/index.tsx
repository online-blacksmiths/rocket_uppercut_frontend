import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import useStep2 from './hook/useStep2';
import userDefaultPhoto from 'assets/user.webp';

import Layout from 'common/Layout';
import FullButton from 'components/FullButton';
import StepDropdownInput from '../components/StepDropdownInput';
import StepNav from '../components/StepNav';
import StepHead from '../components/StepHead';
import cls from 'utils/className';
import useDebounce from 'common/hook/useDebounce';

type SearchDataType = {
  title: string;
  code: string;
  type: string;
};

type SearchResType = SearchDataType[];

const degreeList = ['학사', '전문학사', '석사', '박사', '수료'];
const inSchoolList = ['졸업', '재학', '휴학', '중퇴'];

export default function Step2() {
  const {
    degreeDropdownRef,
    inSchoolDropdownRef,
    isStudent,
    skillList,
    selectSkillList,
    showDegreeList,
    selectDegree,
    showInSchool,
    inSchool,
    position,
    school,
    major,
    company,
    setSelectDegree,
    setInSchool,
    handleChangeStudentState,
    handleSelectSkill,
    handleRemoveSkill,
    handleShowDegreeDropdown,
    handleShowInSchoolDropdown,
    handlePositionInput,
    handleSchoolInput,
    handleMajorInput,
    handleCompanyInput,
  } = useStep2();

  const debouncedPosition = useDebounce(position, 500);

  const { refetch } = useQuery(
    'positionSearch',
    async () => {
      try {
        const res = await axios.get<SearchResType>('/api/v1/search', {
          params: {
            limit: 10,
            type: 'POSITION',
            query: debouncedPosition,
          },
        });

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    {},
  );

  useEffect(() => {
    if (!!debouncedPosition) {
      refetch();
    }
  }, [debouncedPosition, refetch]);

  return (
    <Layout title="프로필">
      <StepNav />
      <article className="w-[328px] flex flex-col items-center">
        <h1 className="mt-10 mb-2 text-xl text-[#28323c]">/이름값/님 반가워요</h1>
        <span className="mt-3 mb-6 text-xs text-[#6e7980]">
          프로필을 입력하고 업무, 채용, 커리어 이야기 등을 나눠보세요.
        </span>
        <img src={userDefaultPhoto} alt="userDefaultPhoto" className="mb-3" />
        <FullButton bgColor="blue" text="사진 등록" />
        {isStudent ? (
          <div className="w-full flex flex-col space-y-3 mt-5">
            <div>
              <StepHead content="학교" isRequire={true} />
              <StepDropdownInput value={school} onChange={() => handleSchoolInput} />
            </div>
            <div>
              <StepHead content="학위" isRequire={true} />
              <div
                ref={degreeDropdownRef}
                onClick={() => handleShowDegreeDropdown()}
                className="relative flex justify-between items-center h-11 px-3 border text-sm outline-none rounded-md hover:border-[#4e61ff] transition-colors cursor-pointer"
              >
                <span className={cls('', showDegreeList ? 'text-[#4e61ff]' : '')}>{selectDegree}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={cls('w-4 h-4 transition-transform', showDegreeList ? 'rotate-180' : '')}
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <ul
                  className={cls(
                    'absolute w-full top-10 origin-top left-0 z-10 bg-white border rounded-md transition-transform transform scale-y-0',
                    showDegreeList ? 'scale-y-100' : '',
                  )}
                >
                  {degreeList.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectDegree(item)}
                      className={cls(
                        'w-full flex items-center h-11 px-4 text-sm hover:bg-[#00000008]',
                        selectDegree === item ? 'bg-[#00000008] font-bold' : '',
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <StepHead content="전공" isRequire={true} />
              <StepDropdownInput value={major} onChange={() => handleMajorInput} />
            </div>
            <div>
              <StepHead content="재학 기간" isRequire={true} />
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="년"
                  className="w-20 h-11 px-2 border text-sm rounded-md outline-none focus:border-[#4e61ff] transition-colors"
                />
                <span>-</span>
                <input
                  type="text"
                  placeholder="년"
                  className="w-20 h-11 px-2 border text-sm rounded-md outline-none focus:border-[#4e61ff] transition-colors"
                />
                <div
                  ref={inSchoolDropdownRef}
                  onClick={() => handleShowInSchoolDropdown()}
                  className="relative flex justify-between items-center w-full h-11 px-3 border text-sm outline-none rounded-md hover:border-[#4e61ff] transition-colors cursor-pointer"
                >
                  <span>{inSchool}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={cls('w-4 h-4 transition-transform', showInSchool ? 'rotate-180' : '')}
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                  <ul
                    className={cls(
                      'absolute w-full top-10 origin-top left-0 z-10 bg-white border rounded-md transition-transform transform scale-y-0',
                      showInSchool ? 'scale-y-100' : '',
                    )}
                  >
                    {inSchoolList.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setInSchool(item)}
                        className={cls(
                          'w-full flex items-center h-11 px-4 text-sm hover:bg-[#00000008]',
                          inSchool === item ? 'bg-[#00000008] font-bold' : '',
                        )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-3 mt-5">
            <div>
              <StepHead content="최근 포지션" isRequire={true} />
              <StepDropdownInput value={position} onChange={handlePositionInput} />
            </div>
            <div>
              <StepHead content="가장 최근에 다닌 회사" isRequire={true} />
              <StepDropdownInput value={company} onChange={() => handleCompanyInput} />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col my-3">
          <h3 className="text-sm text-[#28323c] mb-1">관심분야</h3>
          <div className="w-full">
            <div className="min-h-[50px] py-2 px-3 border rounded-md group">
              {selectSkillList.length !== 0 && (
                <ul className="flex flex-wrap gap-2 mb-1">
                  {selectSkillList.map((item, index) => (
                    <li key={index} className="py-[6px] px-3 rounded-3xl bg-[#4E61FF] text-xs text-white">
                      <span>{item}</span>
                      <button onClick={() => handleRemoveSkill(item)} className="ml-2 text-gray-300 hover:text-white">
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: 프론트엔드 개발"
                  className="w-full h-8 pl-7 border-b text-sm outline-none transition-colors focus:border-[#4E61FF] "
                />
                <div className="absolute left-1 top-2 flex justify-center items-center">
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
            <ul className="flex flex-wrap gap-1 mt-2">
              {skillList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSkill(item)}
                  className="text-xs py-1 px-3 border rounded-3xl cursor-pointer transition-colors hover:border-[#4E61FF] hover:text-[#4E61FF]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isStudent ? (
          <></>
        ) : (
          <div className="w-full">
            <StepHead content="학교" isRequire={false} />
            <StepDropdownInput value={school} onChange={() => handleSchoolInput} />
          </div>
        )}
        <div className="w-full mt-5 space-y-5">
          <FullButton
            bgColor="white"
            text={isStudent ? '학생이 아닙니다' : '학생입니다'}
            onClick={handleChangeStudentState}
          />
          <FullButton bgColor="blue" text="다음" />
        </div>
      </article>
    </Layout>
  );
}
