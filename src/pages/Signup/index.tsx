import { useMemo } from 'react';

import Layout from 'common/Layout';
import { useLocation } from 'react-router-dom';

export default function Signup() {
  const location = useLocation();
  const pathname = useMemo(() => {
    if (location.pathname === '/signup') {
      return true;
    } else {
      return false;
    }
  }, [location.pathname]);
  return (
    <Layout title={pathname ? '회원가입' : null}>
      <div>test</div>
    </Layout>
  );
}
