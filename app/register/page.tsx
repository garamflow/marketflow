import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import Link from "next/link";

const Register = () => {
	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>환영합니다!</h1>
				<h2 className='text-xl'>아래 빈 칸들을 모두 채워주세요.</h2>
			</div>
			<form className='flex flex-col gap-3'>
				<FormInput
					type='text'
					placeholder='사용자 이름'
					required
					errors={["사용자 이름이 너무 짧습니다."]}
				/>
				<FormInput
					type='email'
					placeholder='이메일'
					required
					errors={[]}
				/>
				<FormInput
					type='password'
					placeholder='비밀번호'
					required
					errors={[]}
				/>
				<FormInput
					type='password'
					placeholder='비밀번호 확인하기'
					required
					errors={[]}
				/>
				<FormButton
					className='lg:btn-md'
					loading={false}
					disabled={false}
					text='계정 생성하기'
				/>
			</form>
			<div className='divider' />
			<div className='w-full '>
				<Link
					className='primary-btn lg:btn-md'
					href='/sms'
				>
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
							/>
						</svg>
					</span>
					<span>SMS로 회원가입</span>
				</Link>
			</div>
		</div>
	);
};

export default Register;
