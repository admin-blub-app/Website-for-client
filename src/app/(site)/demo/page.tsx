import type { Metadata } from "next";
import DemoTabs from "./DemoTabs";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "See how a creative page and dashboard look on Snatch On with this demo profile.",
};

export default function DemoPage() {
  return <DemoTabs />;
}
