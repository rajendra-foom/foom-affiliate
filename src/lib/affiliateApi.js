import { getData, postData } from "@/utils/http";

export const getMyAffiliate = () =>
    getData({ endpoint: "/api/v3/affiliate/my-affiliate" });

export const getMyAffiliateHistory = (page = 1, limit = 10) =>
    getData({
      endpoint: "/api/v3/affiliate/my-affiliate/history",
      payload: { query: { page, limit } },
    });

export const postCashout = () =>
    postData({ endpoint: "/api/v3/affiliate/my-affiliate/cashout" });