"use client";

import { EventsEmit, EventsOff, EventsOn } from "@/wailsjs/runtime/runtime";
import { useEffect, useState } from "react";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";
import { MdAddCircleOutline, MdOutlineSave } from "react-icons/md";
import { TClipboardItem, THistoryItem } from "@/lib/types";
import { EClipboardEvent } from "@/lib/enums";

export default function Home() {
	const [history, setHistory] = useState<TClipboardItem[]>([]);

	useEffect(() => {
		// EventsEmit(EClipboardEvent.LOAD_HISTORY, "");

		EventsOn(EClipboardEvent.HISTORY_LOADED, (data: string) => {
			const parsedData: THistoryItem = JSON.parse(data);
			console.log('/n/n/n/n/', parsedData, '/n/n/n/n/');

			// setHistory((prev) => [
			// 	...prev,
			// 	{
			// 		text: parsedData.content,
			// 		timestamp: parsedData.timestamp,
			// 		deviceName: parsedData.device_name,
			// 	},
			// ]);
		});

		EventsOn(EClipboardEvent.TEXT_COPIED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: data,
					timestamp: Date.now(),
				},
			]);
		});

		EventsOn(EClipboardEvent.TEXT_RECEIVED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: data,
					timestamp: Date.now(),
				},
			]);
		});

		EventsOn(EClipboardEvent.IMAGE_COPIED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: "image.png",
					image: data,
					timestamp: Date.now(),
				},
			]);
		});

		return () => {
			EventsOff(
				// EClipboardEvent.LOAD_HISTORY,
				EClipboardEvent.HISTORY_LOADED,
				EClipboardEvent.TEXT_COPIED,
				EClipboardEvent.TEXT_RECEIVED,
				EClipboardEvent.IMAGE_COPIED,
				EClipboardEvent.IMAGE_RECEIVED
			);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div
				id="header"
				className="flex justify-between items-center w-full p-5 border-b-2 border-slate-900"
			>
				<Drawer direction="left">
					<DrawerTrigger asChild>
						<button className="rounded-full hover:bg-slate-900 p-2">
							<RiSettings3Line size={30} />
						</button>
					</DrawerTrigger>

					<DrawerContent className="h-full max-w-md rounded-none rounded-tr-3xl rounded-br-3xl">
						<div className="mx-auto h-full w-full p-2">
							<DrawerHeader className="flex justify-between items-center">
								<DrawerTitle className="text-2xl font-bold">Menu</DrawerTitle>
								<DrawerClose asChild>
									<button>
										<TbLayoutSidebarLeftCollapse size={30} />
									</button>
								</DrawerClose>
							</DrawerHeader>
							<div className="p-4 pb-0">
								<div className="grid grid-cols-2 gap-4">
									{["Devices", "Total Items", "History Limit"].map(
										(item, idx) => {
											return (
												<div
													key={idx}
													className="basis-1/2 p-4 border-2 border-slate-800 rounded-xl"
												>
													<p className="text-md text-muted-foreground">
														{item}
													</p>
													<p className="text-2xl font-bold">300</p>
												</div>
											);
										}
									)}
								</div>
								Profile Section (set name/alias) <br />
								Change Settings
								{/* text boxes to change alias, history limit */}
							</div>
						</div>
						<DrawerFooter className="flex items-center justify-center">
							<button className="bg-gray-200 w-full rounded-sm py-2 mb-4 hover:bg-gray-50 flex justify-center items-center gap-2">
								<MdOutlineSave size={30} className="text-background" />
								<span className="text-background text-lg font-bold">
									Save Changes
								</span>
							</button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<h1 className="text-3xl font-bold">univboard</h1>

				<Drawer direction="right">
					<DrawerTrigger asChild>
						<button className="rounded-full hover:bg-slate-900 p-2">
							<HiOutlineDeviceMobile size={30} />
						</button>
					</DrawerTrigger>
					<DrawerContent className="ml-auto mr-0 h-full max-w-md rounded-none rounded-tl-3xl rounded-bl-3xl">
						<div className="h-full p-2">
							<DrawerHeader className="flex justify-between items-center">
								<DrawerClose asChild>
									<button>
										<TbLayoutSidebarRightCollapse size={30} />
									</button>
								</DrawerClose>
								<DrawerTitle className="text-2xl font-bold">
									Devices
								</DrawerTitle>
							</DrawerHeader>
							<div className="p-4 pb-0">
								<div className="grid grid-cols-1 gap-4">
									{["Poco X3", "Windows PC", "Debian"].map((item, idx) => {
										return (
											<div
												key={idx}
												className="p-4 border-2 border-slate-800 rounded-xl"
											>
												<div className="flex justify-start items-center gap-2 mb-4">
													<HiOutlineDeviceMobile size={20} />
													<p className="text-xl">{item}</p>
												</div>
												<p className="text-muted-foreground text-md">
													Last Synced: 2 hours ago
												</p>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<DrawerFooter className="flex items-center justify-center">
							<button className="bg-gray-200 w-full rounded-sm py-2 mb-4 hover:bg-gray-50 flex justify-center items-center gap-2">
								<MdAddCircleOutline size={30} className="text-background" />
								<span className="text-background text-lg font-bold">
									Add Device
								</span>
							</button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className="my-4 flex-1 flex flex-col items-center gap-4 w-full">
				{history.length > 0 &&
					history.map((line, i) => (
						<p key={i} className="w-screen-lg border-2 border-slate-900 p-2 rounded-lg">
							{line.text.length > 200
								? line.text.slice(0, 200) + "..."
								: line.text}
							{line.image && (
								<img
									className="w-1/4"
									src={"data:image/png;base64," + line.image}
									alt="clipboard"
								/>
							)}
							<br />
						</p>
					))}
			</div>
			<div id="footer">
				<p className="text-sm">&copy; 2024 univboard</p>
			</div>
		</div>
	);
}
