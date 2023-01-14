import { useLocation } from 'react-router-dom';
import facebook from 'assets/facebook-f.svg';
import twitter from 'assets/twitter.svg';
import naver from 'assets/naver.png';

export default function Footer() {
  const location = useLocation();
  const footerMenu: string[] = [
    '회사소개',
    '서비스 소개',
    '서비스 약관',
    '개인정보취급방침',
    '보안 취약점 보고',
    '이메일 무단수집거부',
    '협업 제안',
    '도움말',
    '유료 서비스 안내',
  ];
  const iconList: string[] = [facebook, twitter, naver];
  const businessInfo: string[] = [
    '상호명 : Online Blacksmith',
    '대표명 : Yongineer1990, Pangho297',
    '사업자등록번호 : 123-45-67890',
    '직업정보제공사업 신고번호 : J1234123412341',
    '통신판매업 신고번호 : 2023-인천 감동-01234',
  ];
  const githubInfo: { [key: string]: string }[] = [
    {
      text: 'Back-end Repositorie',
      url: 'https://github.com/online-blacksmiths/rocket_uppercut_backend',
    },
    {
      text: 'Front-end Repositorie',
      url: 'https://github.com/online-blacksmiths/rocket_uppercut_frontend',
    },
    {
      text: 'Back-end : Yongineer1990',
      url: 'https://github.com/Yongineer1990',
    },
    {
      text: 'Front-end : Pangho297',
      url: 'https://github.com/Pangho297',
    },
  ];

  return (
    <>
      {(!location.pathname.includes('step')) && (
        <footer className="flex justify-center border border-[#D9DFEB]">
          <section className="max-w-[1090px] w-full">
            <article className="flex justify-between">
              <ul className="flex gap-3">
                {footerMenu.map((item, index) => (
                  <li
                    key={index}
                    className="py-4 text-sm text-[#3c4858] hover:text-[#4E61FF] transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="flex items-center">
                {iconList.map((item, index) => (
                  <li key={index} className="w-full">
                    <img className="w-4 h-4 m-3" src={item} alt={item} />
                  </li>
                ))}
              </ul>
            </article>
            <article className="pt-3">
              <ul className="flex gap-3">
                {businessInfo.map((item, index) => (
                  <li key={index} className="text-xs text-[#6e7980]">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article>
              <ul className="flex gap-3">
                {githubInfo.map(({ text, url }, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#6e7980] hover:text-[#4E61FF] transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
            <div className="text-xs py-8 text-[#6e7980]">© Since 2023 RocketUppercut, a Online Blacksmith.</div>
          </section>
        </footer>
      )}
    </>
  );
}
