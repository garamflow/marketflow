"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
	text: string;
	className?: string;
}

const FormButton = ({ text, className }: FormButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<button
			className={`primary-btn ${className}`}
			disabled={pending}
		>
			<span className={`${pending ? "loading loading-spinner" : ""}`}></span>
			{pending ? "로딩중" : text}
		</button>
	);
};

export default FormButton;
