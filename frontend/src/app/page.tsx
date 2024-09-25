"use client";
import { EventsOff, EventsOn } from "@/wailsjs/runtime/runtime";
import { useEffect, useState } from "react";

enum ClipboardEvent {
  TEXT_COPIED = "text_copied",
	TEXT_RECEIVED = "text_received"
}

export default function Home() {
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    EventsOn(ClipboardEvent.TEXT_COPIED, (data: string) => {
      setText((prev) => [...prev, data]);
    });

    EventsOn(ClipboardEvent.TEXT_RECEIVED, (data: string) => {
      setText((prev) => [...prev, data]);
    });

    return () => {
      EventsOff(ClipboardEvent.TEXT_COPIED, ClipboardEvent.TEXT_RECEIVED);
    };
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Clipboard Test
      </h1>
      <div className="mb-4">
        {(text.length > 0) && text.map((line, i) => (
          <p key={i}>{line}<br /></p>
        ))}
      </div>
    </div>
  );
}