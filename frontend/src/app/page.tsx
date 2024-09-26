"use client";

import { EventsOff, EventsOn } from "@/wailsjs/runtime/runtime";
import { useEffect, useState } from "react";

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
}

export default function Home() {
  const [history, setHistory] = useState<TClipbpardItem[]>([]);

  useEffect(() => {
    EventsOn(EClipboardEvent.TEXT_COPIED, (data: string) => {
			setHistory((prev) => [...prev, {
				text: data
			}]);
    });

    EventsOn(EClipboardEvent.TEXT_RECEIVED, (data: string) => {
			setHistory((prev) => [...prev, {
				text: data
			}]);
		});
		
		EventsOn(EClipboardEvent.IMAGE_COPIED, (data: string) => {
			setHistory((prev) => [...prev, {
				text: "image.png",
				image: data
			}]);
		});

    return () => {
      EventsOff(EClipboardEvent.TEXT_COPIED, EClipboardEvent.TEXT_RECEIVED);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Clipboard History
      </h1>
      <div className="mb-4">
        {(history.length > 0) && history.map((line, i) => (
					<p key={i}>
						{line.text}
						{line.image && (
							<img
								className="w-1/4"
								src={"data:image/png;base64," + line.image} alt="clipboard"
							/>
						)}
						<br />
					</p>
        ))}
      </div>
    </div>
  );
}