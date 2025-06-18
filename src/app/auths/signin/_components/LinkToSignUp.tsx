import Link from 'next/link';

const LinkToSignUp = () => {
  return (
    <div className="flex-center gap-2">
      <span>WE WRITE가 처음이신가요?</span>
      <Link
        href="/auths/signup"
        className="text-write-main font-semibold underline"
      >
        회원가입
      </Link>
    </div>
  );
};

export default LinkToSignUp;
