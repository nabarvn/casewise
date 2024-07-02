import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { DesignPreview } from "@/components/design";

interface PreviewPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const PreviewPage = async ({ searchParams }: PreviewPageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default PreviewPage;
