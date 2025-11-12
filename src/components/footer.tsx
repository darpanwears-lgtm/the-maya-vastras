import { ShieldCheck, PackageCheck, RotateCw } from "lucide-react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              A new reality unfolds.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
             <h3 className="font-headline text-lg">Our Promise</h3>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PackageCheck className="h-5 w-5 text-primary"/>
                <span>Quality Guaranteed</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
                Every piece is crafted with the highest standards to ensure it meets your expectations.
             </p>
          </div>
           <div className="flex flex-col items-center md:items-start gap-2">
             <h3 className="font-headline text-lg">Secure Payments</h3>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary"/>
                <span>100% Secure Payments</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
                We do not accept Cash on Delivery (COD). All payments are processed securely online.
             </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
             <h3 className="font-headline text-lg">Return Policy</h3>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCw className="h-5 w-5 text-primary"/>
                <span>No Returns/Exchanges</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
                Return or exchange are not available yet.
             </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} THE MAYA VASTRA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
