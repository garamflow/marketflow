import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";

const SMSLogin = () => {
	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>SMS</h1>
				<h2 className='text-xl'>SMS로 로그인하기</h2>
			</div>
			<form className='flex flex-col'>
				<FormInput
					type='number'
					placeholder='전화번호'
					required
					errors={[]}
				/>
				<FormInput
					type='number'
					placeholder='알맞은 코드를 입력해주세요.'
					required
					errors={[]}
				/>
				<FormButton
					loading={false}
					disabled={false}
					text='인증하기'
				/>
			</form>
		</div>
	);
};

export default SMSLogin;
