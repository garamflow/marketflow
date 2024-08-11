import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";

const Login = () => {
	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>로그인</h1>
				<h2 className='text-xl'>이메일로 로그인하기</h2>
			</div>
			<form className='flex flex-col'>
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

				<FormButton
					loading={false}
					disabled={false}
					text='로그인'
				/>
			</form>
			<div className='divider' />
			<SocialLogin />
		</div>
	);
};

export default Login;
