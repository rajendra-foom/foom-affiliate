const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function apiFetch(path, token, options = {}) {
  const res = await fetch(`${BASE}/api/v3/affiliate${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message ?? `Request failed: ${res.status}`);
  }

  return json;
}

export async function getMyAffiliate(token) {
  return apiFetch("/my-affiliate", token);
}

export async function getMyAffiliateHistory(token, page = 1) {
  return apiFetch(`/my-affiliate/history?page=${page}&limit=10`, token);
}

export async function postCashout(token) {
  return apiFetch("/my-affiliate/cashout", token, { method: "POST" });
}
