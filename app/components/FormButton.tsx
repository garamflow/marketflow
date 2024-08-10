interface FormButtonProps {
	text: string;
	loading: boolean;
	disabled?: boolean;
	className?: string;
}

const FormButton = ({ text, loading, disabled, className }: FormButtonProps) => {
	return (
		<button
			className={`primary-btn ${className}`}
			disabled={disabled}
		>
			<span className={`${loading ? "loading loading-spinner" : ""}`}></span>
			{loading ? "로딩중" : text}
		</button>
	);
};

export default FormButton;
