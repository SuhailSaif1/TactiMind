export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Sports Tactical Analysis System. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Designed for professional sports analytics
          </p>
        </div>
      </div>
    </footer>
  );
}