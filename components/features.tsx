import { instrumentSerif } from "@/lib/font";
import { Heart, ImageIcon, PenTool, Search, Tag, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { FeaturesCard } from "./features-card";
import Tiptap from "./titptap";

export const Features = () => {
  return (
    <section className="py-15 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <Badge
            variant="outline"
            className="border border-green-500/20 font-bold text-green-500 bg-green-500/10"
          >
            Features
          </Badge>
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${instrumentSerif.className}`}
          >
            Everything you need to write
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed for modern writers and content creators
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-0 w-full">
          <div className="grid md:grid-cols-12 gap-2">
            <div className="flex flex-col gap-2 col-span-4 w-full">
              <FeaturesCard
                title="Smart Tagging"
                description="Organize your content with tags. Discover trending topics and find exactly what you're looking for."
                icon={Tag}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-4 w-full">
              {" "}
              <FeaturesCard
                title="Cover Images"
                description="Make your posts stand out with beautiful cover images. Upload and customize to match your style."
                icon={ImageIcon}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-4 w-full">
              {" "}
              <FeaturesCard
                title="Engage & Connect"
                description="Like, bookmark, and comment on posts. Build a community around your content and connect with readers."
                icon={Heart}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-2 gap-2">
            <div className="flex flex-col gap-2 col-span-4 w-full">
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
            <div className="w-full col-span-8">
              <Tiptap className="bg-input/30 h-93 rounded-b-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
