import { useLocation } from 'react-router-dom';
import cls from 'utils/className';

export default function StepNav() {
  const location = useLocation();
  return (
    <article className="flex justify-center mt-8">
      <div className="flex">
        <div className="flex items-center">
          <span
            className={cls(
              'w-5 h-5 flex justify-center items-center text-[10px] text-[#6e7980] rounded-full border-[#bbc5d8] border hover:border-[#4E61FF]',
              location.pathname.includes('step1') ? 'bg-[#4e61ffcc] text-white border-0' : '',
            )}
          >
            1
          </span>
          <div className="pl-1 text-xs text-gray-500">인증</div>
        </div>
        <div className="w-4 border-t my-auto mx-2" />
        <div className="flex items-center">
          <span
            className={cls(
              'w-5 h-5 flex justify-center items-center text-[10px] text-[#6e7980] rounded-full border-[#bbc5d8] border hover:border-[#4e61ffcc]',
              location.pathname.includes('step2') ? 'bg-[#4e61ffcc] text-white border-0' : '',
            )}
          >
            2
          </span>
          <div className="pl-1 text-xs text-gray-500">프로필</div>
        </div>
        <div className="w-4 border-t my-auto mx-2" />
        <div className="flex items-center">
          <span
            className={cls(
              'w-5 h-5 flex justify-center items-center text-[10px] text-[#6e7980] rounded-full border-[#bbc5d8] border hover:border-[#4e61ffcc]',
              location.pathname.includes('step3') ? 'bg-[#4e61ffcc] text-white border-0' : '',
            )}
          >
            3
          </span>
          <div className="pl-1 text-xs text-gray-500">연결하기</div>
        </div>
      </div>
    </article>
  );
}
