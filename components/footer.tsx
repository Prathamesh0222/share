import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Typen</h3>
            <p className="text-sm text-muted-foreground">
              A modern platform for writers and readers to share and discover
              meaningful content.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/discover"
                  className="hover:text-foreground transition-colors"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  href="/publish"
                  className="hover:text-foreground transition-colors"
                >
                  Write
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rich Text Editor</li>
              <li>Tag Organization</li>
              <li>Community Engagement</li>
              <li>User Profiles</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Typen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
