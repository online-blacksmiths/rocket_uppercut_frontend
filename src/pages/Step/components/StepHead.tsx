import cls from 'utils/className';

type StepHeadProps = {
  isRequire: boolean;
  content: string;
};

export default function StepHead({ isRequire, content }: StepHeadProps) {
  return (
    <h2
      className={cls(
        'text-sm text-[#28323c] mb-1',
        isRequire ? `after:content-['*'] after:ml-0.5 after:align-top after:text-[#4e61ff]` : '',
      )}
    >
      {content}
    </h2>
  );
}
