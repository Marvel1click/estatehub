import PropertyDetail from './PropertyDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params; // Await the params
  return <PropertyDetail propertyId={id} />;
}