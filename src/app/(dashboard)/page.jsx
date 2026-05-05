"use client";

import { Box, Typography, Skeleton } from "@mui/material";
import {useDashboardPageHandler} from "@/app/(dashboard)/_handler/UseDashboardPageHandler"
import LockedState from "@/app/(dashboard)/_components/LockedState";
import TierCarousel from "@/app/(dashboard)/_components/TierCarousel";
import AffiliateCode from "@/app/(dashboard)/_components/AffiliateCode";
import CashoutCard from "@/app/(dashboard)/_components/CashoutCard";
import TransactionHistory from "@/app/(dashboard)/_components/TransactionHistory";

function PageSkeleton() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {[220, 90, 80, 200].map((h, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={h}
          sx={{ borderRadius: 3 }}
        />
      ))}
    </Box>
  );
}

export default function DashboardPage() {
  const handler = useDashboardPageHandler();
    console.log("isLoading:", handler.isLoading, "isAffiliate:", handler.isAffiliate, "affiliate:", handler.affiliate);
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f7",
        minHeight: "100vh",
        px: 2,
        pt: 2.5,
        pb: 5,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: "-0.02em",
          mb: 2.5,
        }}
      >
        Affiliate
      </Typography>

      {handler.isLoading ? (
        <PageSkeleton />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!handler.isAffiliate ? (
            <LockedState handler={handler} />
          ) : (
            <>
              <TierCarousel handler={handler} />
              <AffiliateCode handler={handler} />
              <CashoutCard handler={handler} />
              <TransactionHistory handler={handler} />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
