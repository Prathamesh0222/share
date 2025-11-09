import { instrumentSerif } from "@/lib/font";
import { Heart, ImageIcon, PenTool, Search, Tag, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { FeaturesCard } from "./features-card";

export const Features = () => {
  return (
    <section className="py-15 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline">Features</Badge>
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${instrumentSerif.className}`}
          >
            Everything you need to write
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed for modern writers and content creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <FeaturesCard
            title="Rich Text Editor"
            description="Write with a powerful, distraction-free editor. Format text, add headings, lists, code blocks, and more."
            icon={PenTool}
          />
          <FeaturesCard
            title="Smart Tagging"
            description="Organize your content with tags. Discover trending topics and find exactly what you're looking for."
            icon={Tag}
          />

          <FeaturesCard
            title="Cover Images"
            description="Make your posts stand out with beautiful cover images. Upload and customize to match your style."
            icon={ImageIcon}
          />
          <FeaturesCard
            title="Engage & Connect"
            description="Like, bookmark, and comment on posts. Build a community around your content and connect with readers."
            icon={Heart}
          />
          <FeaturesCard
            title="Discover Content"
            description="Explore trending posts, popular tags, and curated content. Find inspiration and discover new perspectives."
            icon={Search}
          />
          <FeaturesCard
            title="User Profiles"
            description="Showcase your work with a personalized profile. Follow your favorite writers and build your audience."
            icon={Users}
          />
        </div>
      </div>
    </section>
  );
};
