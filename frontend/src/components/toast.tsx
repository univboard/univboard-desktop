import { GoAlert, GoCheckCircle, GoInfo, GoStop } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { ExternalToast, toast } from "sonner";

export default function Toast(
	title: string,
	props: {
		data?: ExternalToast;
		type?: "success" | "error" | "info" | "warning";
	}
) {
	let icon: JSX.Element;

	switch (props.type) {
		case "success":
			icon = <GoCheckCircle size={20} className="text-lime-600" />;
			break;
		case "error":
			<GoStop size={20} className="text-red-600" />;
			break;
		case "info":
			<GoInfo size={20} />;
			break;
		case "warning":
			<GoAlert size={20} className="text-amber-400" />;
			break;
	}

	return toast.custom(
		(t) => (
			<div className="p-4 w-full sm:w-[350px] rounded-md border-2 relative m-0 flex justify-between items-center gap-2">
				{icon}
				<div className="flex-1 flex justify-start items-center">
					<p className="">{title}</p>
					{props.data?.description && (
						<p className="font-light mt-2">{props.data.description}</p>
					)}
				</div>
				<button
					className="cursor-pointer transition-colors border-slate-700"
					onClick={() => toast.dismiss(t)}
				>
					<IoCloseOutline size={20} />
				</button>
			</div>
		),
		props.data
	);
}
