import { Card } from "@/components";

// dummy jsx component
export default function ExampleCard({ title, description }) {
  return (
    <Card className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
}
