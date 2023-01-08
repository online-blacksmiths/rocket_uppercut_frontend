import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full flex justify-center border-b border-[#D9DFEB]">
      <section className="max-w-[1090px] h-[45.5px] w-full flex justify-between">
        <article className="w-16 hover:bg-gray-50 flex justify-center items-center">
          {/* Logo */}
          <Link to="/" className="w-8 aspect-square bg-[#4E61FF] rounded-full " />
        </article>
        <article className="flex items-center">
          <Link to="/employ" className="text-sm p-3 text-[#1A1A1A] hover:bg-gray-50">
            채용
          </Link>
          <div className="h-full content-none before:border-l before:border-[#D9DFEB] p-3" />
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-xs py-2 px-3 border border-[#D9DFEB] hover:border-[#4E61FF] text-[#28323c] hover:text-[#4E61FF] rounded-md transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="text-xs py-2 px-3 bg-[#4E61FF] hover:bg-[#344BFF] text-white rounded-md transition-colors"
            >
              무료 가입
            </Link>
          </div>
        </article>
      </section>
    </header>
  );
}
