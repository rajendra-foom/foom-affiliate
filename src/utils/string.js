import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (rawDate) => {
    if (!rawDate) return "-";

    const date = new Date(rawDate);
    const formattedDate = format(date, "dd MMM yyyy", { locale: id });

    return `${formattedDate}`;
};
export const formatDateTime = (rawDate, withSecond = false) => {
    if (!rawDate) return "-";

    const date = new Date(rawDate);
    const formattedDate = format(date, "dd MMM yyyy", { locale: id });
    const formattedTime = withSecond
        ? format(date, "HH:mm:ss", { locale: id })
        : format(date, "HH:mm", { locale: id });

    return `${formattedDate}\n${formattedTime}`;
};

export const formatDateLocal = (rawDate) => {
    if (!rawDate) return "-";

    const date = new Date(rawDate.replace(" ", "T") + "Z");

    const d = format(date, "dd MMM yyyy", { locale: id });
    const t = format(date, "HH:mm", { locale: id });

    return `${d}\n${t}`;
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(parseFloat(price));
};

export const formatNumber = (value, locale = "id-ID") => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat(locale).format(value);
};

export const normalizePhoneDigits = (phone) => {
    const raw = String(phone ?? "").trim();
    if (!raw) return "";
    const withPlus = raw.startsWith("+") ? raw : `+${raw}`;
    return withPlus.replace(/^\+/, "");
};

export const normalizeImage = (src) => {
    if (!src) return "/fallback.png";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return "/fallback.png";
};

export const plurarSuffix = (count, suffix = "s") => {
    if ((count || 0) > 1) return suffix;
    return "";
};

export const convertToUppercase = (str) => {
    if (!str) return "";
    return String(str).toUpperCase();
};

export const convertToLowercase = (str) => {
    if (!str) return "";
    return String(str).toLowerCase();
};

export const convertToCapitalizeEachWord = (str) => {
    if (!str) return "";
    return String(str)
        .replace(/_/g, " ")
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

/**
 * Convert ISO date string to datetime-local input format
 * @param {string} isoString - ISO date string (e.g., "2025-09-26T02:41:06.815Z")
 * @returns {string} - Formatted string for datetime-local input (e.g., "2025-09-26T02:41")
 */
export const isoToDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    try {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
        return "";
    }
};

/**
 * Convert datetime-local input format to ISO string
 * @param {string} datetimeLocal - Datetime local string (e.g., "2025-09-26T02:41")
 * @returns {string} - ISO date string (e.g., "2025-09-26T02:41:00.000Z")
 */
export const datetimeLocalToISO = (datetimeLocal) => {
    if (!datetimeLocal) return "";
    try {
        const date = new Date(datetimeLocal);
        return date.toISOString();
    } catch {
        return "";
    }
};

/**
 * Converts an object into a JSON string with stable key ordering.
 *
 * This ensures that the keys of the object are sorted alphabetically
 * before being stringified, so that two objects with the same keys and
 * values will always produce the same JSON string regardless of the
 * original key order.
 *
 * @param {Object} obj - The object to stringify.
 * @returns {string} A JSON string representation of the object with keys sorted.
 *
 * @example
 * const obj = { b: 2, a: 1 };
 * console.log(stableStringify(obj)); // '{"a":1,"b":2}'
 */
export const stableStringify = (obj) =>
    JSON.stringify(
        Object.keys(obj)
            .sort()
            .reduce((res, key) => {
                res[key] = obj[key];
                return res;
            }, {})
    );

export const toUTCFromLocalDate = (value) => {
    const localDate = new Date(value);
    const utcOffsetInMs = localDate.getTimezoneOffset() * 60 * 1000;
    return new Date(localDate.getTime() - utcOffsetInMs).toISOString();
};
export const getImageUrl = (filename) => {
    if (!filename) return "/fallback.png";
    if (filename.startsWith("http")) return filename;
    return `${process.env.NEXT_PUBLIC_STATIC_FILE_URL}${filename}`;
};

export function getImageService(project, path) {
    if (!path) return null;
    if (typeof path !== "string") return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL;
    return `${base.replace(/\/$/, "")}${project}/${path.replace(/^\//, "")}`;
}

const REAL_ADDRESS_TYPES = new Set([
    "street_number",
    "route",
    "sublocality",
    "sublocality_level_1",
    "administrative_area_level_4",
    "administrative_area_level_3",
    "administrative_area_level_2",
    "administrative_area_level_1",
    "postal_code",
    "country",
]);

export function parseGoogleMapsAddress(components) {
    if (!Array.isArray(components)) return "";

    const names = components
        .filter(
            (c) =>
                Array.isArray(c?.types) &&
                c.types.some((t) => REAL_ADDRESS_TYPES.has(t))
        )
        .map((c) => c?.long_name)
        .filter((v) => typeof v === "string" && v.trim().length > 0);

    const len = names.length;
    if (len === 0) return "";
    if (len === 1) return names[0];
    if (len === 2) return `${names[0]} and ${names[1]}`;

    return `${names.slice(0, -1).join(", ")}, ${names[len - 1]}`;
}

export function stripHtml(html) {
    if (!html) return "";
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
}
