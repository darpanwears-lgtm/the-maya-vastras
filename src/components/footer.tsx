import { ShieldCheck, PackageCheck, RotateCw, Truck, BadgeInfo, HelpCircle } from "lucide-react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              A new reality unfolds.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
             <h3 className="font-headline text-lg flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-primary"/>
                Our Promise
             </h3>
             <p className="text-xs text-muted-foreground max-w-xs">
                Every piece is crafted with the highest standards to ensure it meets your expectations.
             </p>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCw className="h-4 w-4 text-primary"/>
                <span>No Returns/Exchanges</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
                Currently, we do not offer returns or exchanges.
             </p>
          </div>

           <div className="flex flex-col items-center md:items-start gap-3">
             <h3 className="font-headline text-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary"/>
                Shipping & Delivery
             </h3>
             <p className="text-xs text-muted-foreground max-w-xs">
               Your order will be delivered within 7-8 days. If it takes longer than 8 days, you will receive a 30% discount on that product.
             </p>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary"/>
                <span>Secure Payments</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
                We do not accept Cash on Delivery (COD). All payments are processed securely online.
             </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
             <h3 className="font-headline text-lg flex items-center gap-2">
                <BadgeInfo className="h-5 w-5 text-primary"/>
                How It Works
             </h3>
             <p className="text-xs text-muted-foreground max-w-xs">
               To order, confirm your cart on WhatsApp. We will send a QR code for payment. Once paid, your order is confirmed.
             </p>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 text-primary"/>
                <span>Cancellations</span>
             </div>
             <p className="text-xs text-muted-foreground max-w-xs">
               You can cancel your order within 12 hours by sending "Cancel My Order" on WhatsApp.
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
