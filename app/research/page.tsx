import type { Metadata } from "next";
import ResearchIndex from "./ResearchIndex";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Everything Solomon Research Lab publishes, by subject — architecture, philosophy, mathematics, physics, biology, chemistry, esotericism — with release date, version, and verification status stated in the open.",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
};

export default function Research() {
  return <ResearchIndex />;
}
