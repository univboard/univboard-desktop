"use client";

import { EventsOff, EventsOn } from "@/wailsjs/runtime/runtime";
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
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";
import { MdAddCircleOutline, MdOutlineSave } from "react-icons/md";

enum EClipboardEvent {
	TEXT_COPIED = "text_copied",
	TEXT_RECEIVED = "text_received",
	IMAGE_COPIED = "image_copied",
	IMAGE_RECEIVED = "image_received",
}

type TClipbpardItem = {
	text: string;
	image?: string;
	receivedAt?: number;
	deviceId?: string;
	deviceName?: string;
};

export default function Home() {
	const [history, setHistory] = useState<TClipbpardItem[]>([]);

	useEffect(() => {
		EventsOn(EClipboardEvent.TEXT_COPIED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: data,
				},
			]);
		});

		EventsOn(EClipboardEvent.TEXT_RECEIVED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: data,
				},
			]);
		});

		EventsOn(EClipboardEvent.IMAGE_COPIED, (data: string) => {
			setHistory((prev) => [
				...prev,
				{
					text: "image.png",
					image: data,
				},
			]);
		});

		return () => {
			EventsOff(EClipboardEvent.TEXT_COPIED, EClipboardEvent.TEXT_RECEIVED);
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
													<p className="text-xl font-bold mb-4">
														{item}
													</p>
													<p className="text-2xl">300</p>
												</div>
											);
										}
									)}
								</div>
								Profile Section (set name/alias) <br />
								Change Settings
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
								<DrawerTitle className="text-2xl font-bold">Devices</DrawerTitle>
							</DrawerHeader>
							<div className="p-4 pb-0">
								<div className="grid grid-cols-1 gap-4">
									{["Poco X3", "Windows PC", "Debian"].map(
										(item, idx) => {
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
										}
									)}
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
			<div className="mb-4 flex-1">
				{history.length > 0 &&
					history.map((line, i) => (
						<p key={i}>
							{line.text}
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
