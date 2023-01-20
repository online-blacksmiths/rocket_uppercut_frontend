import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigator() {
  const [locationList, setLocationList] = useState<string[]>();
  const location = useLocation();

  const formatRoute = (path: string): string => {
    switch (path) {
      case '':
        return '홈';
      case 'login':
        return '로그인';
      case 'signup':
        return '회원가입';
      default:
        return '';
    }
  };

  useEffect(() => {
    setLocationList(location.pathname.split('/'));
  }, [location.pathname]);

  return (
    <ul className="w-full flex my-3 space-x-1.5 justify-start text-[11px] text-[#6e7980]">
      {locationList?.map((item, index) => (
        <li key={index}>
          <Link to={item === '' ? '/' : `/${item}`}>{formatRoute(item)}</Link>
          {index !== locationList.length - 1 && <span> {'/'} </span>}
        </li>
      ))}
    </ul>
  );
}
