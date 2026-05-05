"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  getMyAffiliate,
  getMyAffiliateHistory,
  postCashout,
} from "@/lib/affiliateApi";
import { TIER_CONFIG, UNLOCK_THRESHOLD } from "@/lib/tierConfig";

export function useDashboardPageHandler() {
  const { data: session, status: sessionStatus } = useSession();
  const token = session?.backendToken;
  const queryClient = useQueryClient();

  const [carouselIndex, setCarouselIndex] = useState(null);

  const {
    data: affiliateData,
    isLoading: isAffiliateLoading,
      fetchStatus,
    error: affiliateError,
  } = useQuery({
    queryKey: ["affiliate"],
    queryFn: () => getMyAffiliate(token),
    enabled: !!token,
    select: (res) => res.data,
  });

  console.log("affiliateData:", affiliateData);

  useEffect(() => {
    if (carouselIndex === null && affiliateData?.isAffiliate) {
      const idx = TIER_CONFIG.findIndex(
        (t) => t.key === affiliateData.tier?.toLowerCase(),
      );
      setCarouselIndex(Math.max(0, idx));
    }
  }, [affiliateData, carouselIndex]);

  const [historyPage, setHistoryPage] = useState(1);

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["affiliate", "history", historyPage],
    queryFn: () => getMyAffiliateHistory(token, historyPage),
    enabled: !!token && !!affiliateData?.isAffiliate,
    select: (res) => res.data,  // now res.data = { list, pagination }
  });

  function handleNextPage() {
    setHistoryPage((p) => p + 1);
  }

  function handlePrevPage() {
    setHistoryPage((p) => Math.max(1, p - 1));
  }

  const cashoutMutation = useMutation({
    mutationFn: () => postCashout(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate", "history"] });
    },
  });


  const isAffiliate = affiliateData?.isAffiliate ?? false;
  const totalSpend = affiliateData?.totalSpend ?? 0;
  const unlockProgress = Math.min(
    100,
    Math.round((totalSpend / UNLOCK_THRESHOLD) * 100),
  );
  const unlockRemaining = Math.max(0, UNLOCK_THRESHOLD - totalSpend);

  const currentTierIndex = TIER_CONFIG.findIndex(
    (t) => t.key === affiliateData?.tier?.toLowerCase(),
  );
  const viewedTierIndex = carouselIndex ?? Math.max(0, currentTierIndex);
  const viewedTier = TIER_CONFIG[viewedTierIndex];
  const isViewingCurrentTier = viewedTierIndex === currentTierIndex;
  const isViewingLockedTier = viewedTierIndex > currentTierIndex;

  const totalVolume = affiliateData?.totalVolume ?? 0;
  const tierProgressPct = viewedTier?.next
    ? Math.min(100, Math.round((totalVolume / viewedTier.next) * 100))
    : 100;
  const tierProgressRemaining = viewedTier?.next
    ? Math.max(0, viewedTier.next - totalVolume)
    : 0;

  const pendingAmount = affiliateData?.pendingAmount ?? 0;

  function handleCarouselPrev() {
    setCarouselIndex((i) => Math.max(0, (i ?? 0) - 1));
  }

  function handleCarouselNext() {
    setCarouselIndex((i) => Math.min(TIER_CONFIG.length - 1, (i ?? 0) + 1));
  }

  function handleCarouselDot(index) {
    setCarouselIndex(index);
  }

  function handleCashout() {
    cashoutMutation.mutate();
  }

  const [codeCopied, setCodeCopied] = useState(false);

  async function handleCopyCode() {
    const code = affiliateData?.code ?? "";
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  return {
    isLoading: sessionStatus === "loading" || (!!token && (isAffiliateLoading || fetchStatus === "fetching")),
    isHistoryLoading,
    error: affiliateError,

    isAffiliate,
    affiliate: affiliateData,

    totalSpend,
    unlockProgress,
    unlockRemaining,

    viewedTierIndex,
    viewedTier,
    currentTierIndex,
    isViewingCurrentTier,
    isViewingLockedTier,
    totalVolume,
    tierProgressPct,
    tierProgressRemaining,
    handleCarouselPrev,
    handleCarouselNext,
    handleCarouselDot,

    code: affiliateData?.code,
    codeCopied,
    handleCopyCode,

    history: historyData?.list ?? [],
    historyPagination: historyData?.pagination ?? null,
    historyPage,
    handleNextPage,
    handlePrevPage,
    pendingAmount,

    isCashingOut: cashoutMutation.isPending,
    cashoutSuccess: cashoutMutation.isSuccess,
    handleCashout,
  };
}
