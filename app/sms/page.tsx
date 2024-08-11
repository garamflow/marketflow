import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";

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
					name='phone'
					errors={[]}
				/>
				<FormInput
					type='number'
					placeholder='알맞은 코드를 입력해주세요.'
					required
					name='code'
					errors={[]}
				/>
				<FormButton text='인증하기' />
			</form>
		</div>
	);
};

export default SMSLogin;
