import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import cls from 'utils/className';

type CheckboxProps = {
  id: string;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  text: string;
};

/**
 * @param id 체크박스 id (string)
 * @param isChecked 체크박스 상태에 따른 Boolean값 (boolean)
 * @param setIsChecked 체크박스 상태 변경 함수 (Dispatch<SetStateAction<boolean>>)
 * @param text 체크박스 우측 텍스트 내용 (string)
 */
export default function Checkbox({ id, isChecked, setIsChecked, text }: CheckboxProps) {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(prev => !prev);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="checkbox"
        onChange={e => handleCheck(e)}
        checked={isChecked}
        className="w-4 h-4 absolute top-0 left-0 hidden"
      />
      <label htmlFor={id} className="flex items-center group">
        <div
          className={cls(
            'w-4 h-4 border transition-all',
            isChecked === true
              ? 'rounded-full border-[#4E61FF] bg-[#4E61FF] ring-1 ring-offset-1 ring-[#4E61FF]'
              : 'rounded-sm',
          )}
        />
        <div className="pl-1 text-sm">{text}</div>
      </label>
    </div>
  );
}
