import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/admin/media")({ component: Media });

const media = [
  "hero-bg-image.webp","all-products.png","alkaline-water.png","primium-water.png","bottle-real-1.jpeg","about-plant.webp",
  "project-timmy-tiles.webp","project-timmy-sanitary.webp","project-sapphire-sports.webp","project-four.webp","project-five.webp",
];

function Media() {
  return (
    <Panel title="Media library" action={<Btn><Upload className="h-4 w-4" /> Upload</Btn>}>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {media.map((m) => (
          <div key={m} className="glass-card overflow-hidden">
            <div className="aspect-square bg-bg-light">
              <img src={`/images/${m}`} alt={m} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <div className="text-xs font-mono truncate text-navy" title={m}>{m}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
