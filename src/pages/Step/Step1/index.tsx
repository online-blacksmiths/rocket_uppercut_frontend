import Layout from 'common/Layout';
import { StepResType } from 'pages/Signup/types';
import StepNav from '../components/StepNav';

export default function Step1() {
  const localData: StepResType = JSON.parse(localStorage.getItem('step') || '');
  return (
    <Layout title="회원가입">
      <section className="w-[700px] flex flex-col items-center">
        <StepNav />
        {localData.type === 'PHONE' ? (
          <article className="flex flex-col justify-center">
            <p className="mt-10 mb-5 text-xl text-[#28323c]">휴대전화 인증</p>
            <div>
              <span></span>
              <button></button>
            </div>
          </article>
        ) : (
          <div>Email Step 1</div>
        )}
      </section>
    </Layout>
  );
}
