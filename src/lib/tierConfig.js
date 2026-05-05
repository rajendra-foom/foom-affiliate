export const TIER_CONFIG = [
  {
    name: "Bronze",
    key: "bronze",
    rate: 5,
    min: 0,
    next: 5_000_000,
    color: "#C07A30",
    bgColor: "#F5E6D3",
  },
  {
    name: "Silver",
    key: "silver",
    rate: 10,
    min: 5_000_000,
    next: 10_000_000,
    color: "#5F7080",
    bgColor: "#E8ECF0",
  },
  {
    name: "Gold",
    key: "gold",
    rate: 15,
    min: 10_000_000,
    next: null,
    color: "#B8860B",
    bgColor: "#FDF3D7",
  },
];

// Must match backend business rule
export const UNLOCK_THRESHOLD = 110_000;

export function getTierIndex(tierKey) {
  return TIER_CONFIG.findIndex((t) => t.key === tierKey?.toLowerCase());
}

export function formatRupiah(value) {
  if (value == null) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}
