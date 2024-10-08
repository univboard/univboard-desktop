import type { Metadata } from "next";
import { ThemeProvider } from "@/components/themeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "univboard",
	description: "cross-platform clipboard sharing",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
