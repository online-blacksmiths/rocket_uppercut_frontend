import cls from 'utils/className';

type FullButtonProps = {
  onClick?: () => void;
  bgColor: 'white' | 'blue';
  text: string;
  icon?: JSX.Element;
  type?: string;
  disable?: boolean;
};

export default function FullButton({ onClick, bgColor, text, icon, type, disable }: FullButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={cls(
        'group w-full h-10 border rounded-md relative flex justify-center items-center transition-colors',
        bgColor === 'white' ? 'bg-white hover:border-[#4E61FF]' : 'bg-[#4E61FF] hover:bg-[#344BFF]',
        disable === false ? 'opacity-60 cursor-not-allowed' : '',
      )}
      onClick={() => onClick !== undefined && onClick()}
    >
      <div
        className={cls(
          'w-10 h-10 aspect-square absolute left-0 flex justify-center items-center  transition-colors',
          bgColor === 'white' ? 'text-gray-600 group-hover:text-[#4E61FF]' : 'text-white',
        )}
      >
        {icon && icon}
      </div>
      <span
        className={cls(
          'text-sm transition-colors',
          bgColor === 'white' ? 'text-gray-600 group-hover:text-[#4E61FF]' : 'text-white',
        )}
      >
        {text}
      </span>
    </button>
  );
}
