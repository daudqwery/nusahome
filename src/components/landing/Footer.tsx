import { WHATSAPP_URL } from "@/data/products";
import { MessageCircle, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">NusaHome</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Toko furnitur online terpercaya. Sofa, kasur & sofa bed berkualitas dengan harga pabrik.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Belanja di</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://vt.tiktok.com/ZSHbH6WfJ/?page=Mall" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                  TikTok Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Tokopedia
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Shopee
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Hubungi Kami</h4>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: 0812-3456-7890
            </a>
            <p className="text-sm text-primary-foreground/70 mt-2">
              Jam operasional: 08.00 - 21.00 WIB
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} NusaHome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
