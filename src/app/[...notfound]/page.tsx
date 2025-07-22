// Catch-all route to redirect to 404 page for any undefined routes
import { notFound } from 'next/navigation';

export default function CatchAllRoute() {
  // This will trigger Next.js to show the not-found page
  notFound();
  
  // This return is just for TypeScript - the function will never reach here
  return null;
}
