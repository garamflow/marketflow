import Link from "next/link";

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-between min-h-screen'>
			<div className='my-auto flex flex-col items-center gap-3 *:font-medium'>
				<span className='text-9xl'>Market</span>
				<h1 className='text-4xl'>MarketFlow</h1>
				<h2>마켓플로우에 오신것을 환영합니다.</h2>
			</div>
			<div className='flex flex-col gap-2'>
				<button className='btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
					<Link href='/create-account'>시작하기</Link>
				</button>
				<div className='flex gap-3'>
					<span>계정이 존재한다면?</span>
					<Link
						href='/login'
						className='link link-primary link-hover'
					>
						로그인
					</Link>
				</div>
			</div>
		</div>
	);
}
