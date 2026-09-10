import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUBJECTS, SUBJECT_BY_KEY, isSubject } from "@/lib/research";
import ResearchIndex from "../ResearchIndex";

type Params = { subject: string };

export function generateStaticParams(): Params[] {
  return SUBJECTS.map((s) => ({ subject: s.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subject } = await params;
  if (!isSubject(subject)) return {};
  const s = SUBJECT_BY_KEY[subject];
  return {
    title: `${s.title} — Research`,
    description: s.blurb,
    alternates: { canonical: `/research/${subject}` },
    robots: { index: true, follow: true },
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subject } = await params;
  if (!isSubject(subject)) notFound();
  return <ResearchIndex subject={subject} />;
}
