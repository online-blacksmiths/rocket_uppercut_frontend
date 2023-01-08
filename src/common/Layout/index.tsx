import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Layout({ children, title }: { children: ReactNode; title: string | null }) {
  return (
    <>
      <Helmet>
        <title>{title !== null ? `${title} | 로켓어퍼컷 - 비즈니스 네트워크` : '로켓어퍼컷 - 비즈니스 네트워크'}</title>
      </Helmet>
      <section className="w-full flex justify-center">
        <div className="max-w-[1060px] w-full flex flex-col items-center">{children}</div>
      </section>
    </>
  );
}
