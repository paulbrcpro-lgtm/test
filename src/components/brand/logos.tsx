import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
});

export function GoogleAdsLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Google Ads</title>
      <path
        d="M4.8 20.5l5.1-8.85 5.1 8.85a3 3 0 01-5.1 3.09L9 23a3 3 0 01-5.1-2.5z"
        fill="#FBBC04"
      />
      <path
        d="M12.75 3l5.1 8.85-5.1 8.85-5.1-8.85 5.1-8.85z"
        fill="#4285F4"
      />
      <circle cx="4.5" cy="20.5" r="3" fill="#34A853" />
    </svg>
  );
}

export function GtmLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Google Tag Manager</title>
      <path
        d="M12.047 2l9.953 9.953-9.953 9.953-3.516-3.516 6.437-6.437-6.437-6.437L12.047 2z"
        fill="#8AB4F8"
      />
      <path
        d="M12.046 2L2.094 11.953l9.952 9.953 3.516-3.516-6.437-6.437 6.437-6.437L12.046 2z"
        fill="#4285F4"
      />
      <circle cx="7.5" cy="16.5" r="2.5" fill="#246FDB" />
    </svg>
  );
}

export function Ga4Logo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Google Analytics</title>
      <rect x="15" y="4" width="5" height="16" rx="2.5" fill="#F9AB00" />
      <rect x="9.5" y="10" width="5" height="10" rx="2.5" fill="#E37400" />
      <circle cx="6.5" cy="17.5" r="2.5" fill="#E37400" />
    </svg>
  );
}

export function MetaLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Meta</title>
      <path
        d="M12 6c-2.3 0-4 2-5.3 4.3C5.2 13 4 15.5 2.5 15.5 1.3 15.5 1 14.6 1 13.8c0-2.1 1.4-5 3-5 1 0 1.7.7 2.6 2 .4-.6.9-1.3 1.4-2C6.8 7.4 5.5 6.6 4 6.6 1.6 6.6 0 10 0 13.8c0 2.2.9 4.2 3 4.2 2.2 0 3.7-2 5-4.2C9.5 11.4 10.7 9 12 9s2.5 2.4 4 4.8c1.3 2.2 2.8 4.2 5 4.2 2.1 0 3-2 3-4.2 0-3.8-1.6-7.2-4-7.2-1.5 0-2.8.8-4 2.7.5.7 1 1.4 1.4 2 .9-1.3 1.6-2 2.6-2 1.6 0 3 2.9 3 5 0 .8-.3 1.7-1.5 1.7-1.5 0-2.7-2.5-4.2-5.2C16 8 14.3 6 12 6z"
        fill="#1877F2"
      />
    </svg>
  );
}

export function GoogleCloudLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Google Cloud</title>
      <path
        d="M15.75 7.5h-.59L13 5.38a6 6 0 00-10.2 3.28A4.5 4.5 0 005.25 17h10.5a3.75 3.75 0 000-7.5z"
        fill="#4285F4"
      />
      <path
        d="M19.5 17H5.25A4.5 4.5 0 012.8 8.66a4.5 4.5 0 004 2.34h12.7v6z"
        fill="#34A853"
      />
      <path d="M19.5 11a4 4 0 010 6H10v-6h9.5z" fill="#FBBC04" opacity=".9" />
      <path d="M15.75 7.5L13 5.38A6 6 0 003 8.5l2.6 1.3A3.5 3.5 0 019 8.5a3.5 3.5 0 013.2 2l3.55-3z" fill="#EA4335" />
    </svg>
  );
}

export function SalesforceLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Salesforce</title>
      <path
        d="M10 4.8c1-1 2.5-1.7 4.1-1.7 2.2 0 4 1.2 5 3 .9-.4 1.9-.6 3-.6 4.4 0 7.9 3.7 7.9 8.2s-3.5 8.2-7.9 8.2c-.6 0-1.2-.1-1.8-.2-.9 1.6-2.6 2.7-4.5 2.7-.8 0-1.6-.2-2.3-.5-.9 2-2.9 3.4-5.2 3.4-2.4 0-4.5-1.5-5.4-3.7-.5.1-1 .2-1.5.2-3 0-5.4-2.5-5.4-5.5 0-2 1.1-3.8 2.7-4.7C-.2 12-.5 10.6-.5 9c0-4.4 3.6-8 8-8 2.6 0 4.9 1.3 6.3 3.3.2-.2.4-.4.7-.5z"
        transform="translate(0.5 1)"
        fill="#00A1E0"
      />
    </svg>
  );
}

export function HubspotLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>HubSpot</title>
      <path
        d="M18.17 7.68V5.1a2 2 0 10-1 0v2.58A6 6 0 0013 9.45L6.77 4.6a2.26 2.26 0 00-1.29-3.35 2.25 2.25 0 10.9 4.28v.02l5.91 4.6a6 6 0 106.88 10.2l1.57 1.57a.77.77 0 101.09-1.1l-1.56-1.56a5.96 5.96 0 00-2.1-10.58zm-1.5 8.82a3 3 0 110-6 3 3 0 010 6z"
        fill="#FF7A59"
      />
    </svg>
  );
}

export function StapeLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Stape</title>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF6E30" />
      <path
        d="M7 15.5c0 1.3 1.3 2.2 3.5 2.2s3.4-1 3.4-2.5c0-1.6-1.3-2.2-3.4-2.5-1.5-.3-2-.6-2-1.1 0-.5.5-.8 1.4-.8s1.5.3 1.6 1h2.3c-.1-1.8-1.5-2.7-3.8-2.7S7 10 7 11.5c0 1.6 1.2 2.2 3.3 2.5 1.5.3 2 .5 2 1.1 0 .6-.5.9-1.6.9-1 0-1.6-.3-1.7-1.1H7zM14.5 13h4v2h-4v-2z"
        fill="#fff"
      />
    </svg>
  );
}

export function BigQueryLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>BigQuery</title>
      <path
        d="M12 2a10 10 0 00-5 18.66l1.7-1.7a8 8 0 118.6 0l1.7 1.7A10 10 0 0012 2z"
        fill="#4285F4"
      />
      <path
        d="M17.8 20.7l-3.5-3.5a4.5 4.5 0 10-2.12 2.12l3.5 3.5 2.12-2.12zM10 14.5a2.5 2.5 0 113.5-3.5 2.5 2.5 0 01-3.5 3.5z"
        fill="#4285F4"
      />
    </svg>
  );
}

export function LookerLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Looker</title>
      <circle cx="12" cy="12" r="4" fill="none" stroke="#4285F4" strokeWidth="2" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="#4285F4" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="#EA4335" />
    </svg>
  );
}

export function ConsentModeLogo({ size = 24, ...rest }: LogoProps) {
  return (
    <svg {...base(size)} {...rest}>
      <title>Consent Mode v2</title>
      <path
        d="M12 2L3 6v6c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12V6l-9-4z"
        fill="#34A853"
      />
      <path
        d="M9 12l2 2 4-4"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type BrandLogo = {
  name: string;
  Component: (p: LogoProps) => React.JSX.Element;
};

export const brandLogos: BrandLogo[] = [
  { name: "Google Ads", Component: GoogleAdsLogo },
  { name: "Google Tag Manager", Component: GtmLogo },
  { name: "Google Analytics 4", Component: Ga4Logo },
  { name: "Google Cloud", Component: GoogleCloudLogo },
  { name: "Meta Ads", Component: MetaLogo },
  { name: "Salesforce", Component: SalesforceLogo },
  { name: "HubSpot", Component: HubspotLogo },
  { name: "Stape", Component: StapeLogo },
  { name: "BigQuery", Component: BigQueryLogo },
  { name: "Looker Studio", Component: LookerLogo },
  { name: "Consent Mode v2", Component: ConsentModeLogo },
];
