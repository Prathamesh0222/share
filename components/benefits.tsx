import { instrumentSerif } from "@/lib/font";
import { MessageCircle, PenTool, Tag } from "lucide-react";
import { BenefitItem } from "./benefit-item";

export const Benefits = () => {
  return (
    <section className="py-24 px-4 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2
              className={`text-3xl md:text-4xl font-bold tracking-tight ${instrumentSerif.className}`}
            >
              Built for writers,
              <br />
              designed for readers
            </h2>
            <p className="text-sm text-muted-foreground">
              Experience a platform that understands what writers and readers
              need.
              <br /> Clean, fast, and focused on what matters most.
            </p>
            <div className="space-y-4 pt-4">
              <BenefitItem
                title="Lightning Fast"
                description="Write and publish without friction. Our editor is fast, responsive, and gets out of your way."
              />
              <BenefitItem
                title="Clean Interface"
                description="A distraction-free reading and writing experience. Focus on your content, not the interface."
              />
              <BenefitItem
                title="Community Driven"
                description="Connect with like-minded writers and readers. Build your audience and discover amazing content."
              />
              <BenefitItem
                title="Secure & Private"
                description="Your content is yours. We use industry-standard security to protect your data and privacy."
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-8 rounded-lg border border-border bg-background">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <PenTool className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Write with ease</h4>
                    <p className="text-sm text-muted-foreground">
                      Rich formatting tools at your fingertips
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Organize with tags</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep your content organized and discoverable
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Engage with readers</h4>
                    <p className="text-sm text-muted-foreground">
                      Build a community through comments and interactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
