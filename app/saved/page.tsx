import type { Metadata } from "next";
import SavedHomes from "@/components/SavedHomes";

export const metadata: Metadata = {
  title: "Saved homes",
  description: "Review illustrative EstateHub homes saved locally in this browser.",
};

export default function SavedPage() {
  return <SavedHomes />;
}
