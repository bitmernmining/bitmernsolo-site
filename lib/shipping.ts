export interface ShippingZone {
  name: string;
  cents: number;
  countries: string[];
}

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    name: "Asia-Pacific",
    cents: 4000,
    countries: [
      "JP", "KR", "SG", "TW", "HK", "MY", "TH", "PH", "VN", "ID",
      "IN", "BD", "PK", "LK", "MM", "KH", "LA", "BN", "MO", "NP",
      "CN",
    ],
  },
  {
    name: "Oceania",
    cents: 6000,
    countries: ["AU", "NZ"],
  },
  {
    name: "Europe",
    cents: 8000,
    countries: [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
      "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
      "PL", "PT", "RO", "SK", "SI", "ES", "SE",
      "GB", "CH", "NO", "IS", "LI", "AL", "BA", "ME", "MK", "RS",
      "XK", "MD", "UA",
    ],
  },
  {
    name: "Middle East",
    cents: 9500,
    countries: [
      "AE", "SA", "IL", "TR", "QA", "KW", "BH", "OM", "JO", "LB",
      "IQ", "IR",
    ],
  },
  {
    name: "North America",
    cents: 14000,
    countries: ["US", "CA", "MX"],
  },
  {
    name: "South America",
    cents: 15000,
    countries: [
      "BR", "AR", "CL", "CO", "PE", "EC", "VE", "UY", "PY", "BO",
      "GY", "SR",
    ],
  },
  {
    name: "Africa",
    cents: 15000,
    countries: [
      "ZA", "NG", "KE", "EG", "GH", "TZ", "ET", "MA", "TN", "DZ",
      "SN", "CI", "CM", "UG", "MZ",
    ],
  },
];

const DEFAULT_SHIPPING_CENTS = 15000;

const countryToZone = new Map<string, ShippingZone>();
for (const zone of SHIPPING_ZONES) {
  for (const code of zone.countries) {
    countryToZone.set(code, zone);
  }
}

export function getShippingCents(countryCode: string): number {
  const zone = countryToZone.get(countryCode.toUpperCase());
  return zone?.cents ?? DEFAULT_SHIPPING_CENTS;
}

export function getShippingZoneName(countryCode: string): string {
  const zone = countryToZone.get(countryCode.toUpperCase());
  return zone?.name ?? "International";
}

export const SHIPPING_COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Mexico", value: "MX" },
  { label: "United Kingdom", value: "GB" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Netherlands", value: "NL" },
  { label: "Spain", value: "ES" },
  { label: "Italy", value: "IT" },
  { label: "Portugal", value: "PT" },
  { label: "Greece", value: "GR" },
  { label: "Cyprus", value: "CY" },
  { label: "Austria", value: "AT" },
  { label: "Belgium", value: "BE" },
  { label: "Bulgaria", value: "BG" },
  { label: "Croatia", value: "HR" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Estonia", value: "EE" },
  { label: "Finland", value: "FI" },
  { label: "Hungary", value: "HU" },
  { label: "Ireland", value: "IE" },
  { label: "Latvia", value: "LV" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Malta", value: "MT" },
  { label: "Poland", value: "PL" },
  { label: "Romania", value: "RO" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Sweden", value: "SE" },
  { label: "Norway", value: "NO" },
  { label: "Switzerland", value: "CH" },
  { label: "Iceland", value: "IS" },
  { label: "Albania", value: "AL" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Montenegro", value: "ME" },
  { label: "North Macedonia", value: "MK" },
  { label: "Serbia", value: "RS" },
  { label: "Moldova", value: "MD" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Israel", value: "IL" },
  { label: "Turkey", value: "TR" },
  { label: "Qatar", value: "QA" },
  { label: "Kuwait", value: "KW" },
  { label: "Bahrain", value: "BH" },
  { label: "Oman", value: "OM" },
  { label: "Jordan", value: "JO" },
  { label: "Lebanon", value: "LB" },
  { label: "Japan", value: "JP" },
  { label: "South Korea", value: "KR" },
  { label: "Singapore", value: "SG" },
  { label: "Taiwan", value: "TW" },
  { label: "Hong Kong", value: "HK" },
  { label: "Malaysia", value: "MY" },
  { label: "Thailand", value: "TH" },
  { label: "Philippines", value: "PH" },
  { label: "Vietnam", value: "VN" },
  { label: "Indonesia", value: "ID" },
  { label: "India", value: "IN" },
  { label: "Australia", value: "AU" },
  { label: "New Zealand", value: "NZ" },
  { label: "Brazil", value: "BR" },
  { label: "Argentina", value: "AR" },
  { label: "Chile", value: "CL" },
  { label: "Colombia", value: "CO" },
  { label: "Peru", value: "PE" },
  { label: "Ecuador", value: "EC" },
  { label: "Uruguay", value: "UY" },
  { label: "South Africa", value: "ZA" },
  { label: "Nigeria", value: "NG" },
  { label: "Kenya", value: "KE" },
  { label: "Egypt", value: "EG" },
  { label: "Ghana", value: "GH" },
  { label: "Morocco", value: "MA" },
] as const;
