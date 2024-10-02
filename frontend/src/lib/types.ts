export type TClipboardItem = {
	text: string;
	image?: string;
	timestamp?: number;
	deviceId?: string;
	deviceName?: string;
};

export type THistoryItem = {
	content: string;
	timestamp: number;
	device_name: string;
};
