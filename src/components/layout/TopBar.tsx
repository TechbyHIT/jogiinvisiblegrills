import {
  BUSINESS_CONFIG,
  getMailtoUrl,
  getPhoneUrl,
  isConfiguredContactValue,
} from "@/config/business";

export function TopBar() {
  const { phone, whatsapp, email } = BUSINESS_CONFIG;
  const phoneUrl = getPhoneUrl();

  return (
    <div className="bg-primary-dark text-slate-300 text-xs border-b border-white/10">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 min-h-9 py-1.5 md:py-0 md:h-9">
        <p className="truncate font-medium hidden sm:block flex-1">
          Invisible Grills &amp; Safety Nets in Bengaluru &amp; Mysuru — {BUSINESS_CONFIG.name}
        </p>
        <p className="truncate font-medium sm:hidden text-[11px] flex-1">
          {BUSINESS_CONFIG.name}
        </p>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {isConfiguredContactValue(email) && (
            <a
              href={getMailtoUrl("Enquiry from website")}
              className="hidden md:inline hover:text-gold transition-colors truncate max-w-[180px]"
            >
              {email}
            </a>
          )}
          <a
            href={`https://wa.me/${whatsapp.raw.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:text-gold transition-colors"
          >
            WhatsApp {whatsapp.display}
          </a>
          <a
            href={phoneUrl}
            className="hidden md:inline hover:text-gold transition-colors font-medium text-white"
          >
            {phone.display}
          </a>
          <a
            href={phoneUrl}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[11px] sm:text-xs font-bold text-primary-dark hover:bg-gold-hover transition-colors shadow-sm"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
