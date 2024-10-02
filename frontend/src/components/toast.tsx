import { IoIosCloseCircleOutline } from "react-icons/io";
import { ExternalToast, toast } from "sonner";

export default function Toast(
	title: string,
	props: {
		data?: ExternalToast;
		type?: "success" | "error" | "info" | "warning";
		description?: string;
	}
) {
	let color = "border-slate-700";
	switch (props.type) {
		case "success":
			color = "border-green-500";
			break;
		case "error":
			color = "border-red-500";
			break;
		case "info":
			color = "border-blue-500";
			break;
		case "warning":
			color = "border-yellow-500";
			break;
	}

	return toast.custom(
		(t) => (
			<div className={`p-4 w-1/3 rounded-md border-2 ${color} relative`}>
				<p className="">{title}</p>
				{props.description && (
					<p className="font-light mt-2">{props.description}</p>
				)}
				<button
					className="absolute cursor-pointer top-2 right-2 transition-colors border-slate-700"
					onClick={() => toast.dismiss(t)}
				>
					<IoIosCloseCircleOutline size={30} />
				</button>
			</div>
		),
		props.data
	);
}
