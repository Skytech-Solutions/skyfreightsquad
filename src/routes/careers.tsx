import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-offwhite pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-navy mb-4">Careers</h1>
        <p className="text-dim-gray mb-6">Coming soon.</p>
        <Link to="/" className="text-skyblue hover:underline">← Back to Home</Link>
      </div>
    </div>
  ),
});
