"use client";

import { Box, Typography, Button } from "@mui/material";
import { formatRupiah } from "@/lib/tierConfig";

export default function CashoutCard({ handler }) {
  const { pendingAmount, isCashingOut, cashoutSuccess, handleCashout } =
    handler;
  const hasAmount = pendingAmount > 0;

  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: 3, p: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 12, color: "#aaa", mb: 0.5 }}>
            Komisi pending
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: hasAmount ? "#1a1a1a" : "#ccc",
            }}
          >
            {formatRupiah(pendingAmount)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleCashout}
          disabled={!hasAmount || isCashingOut}
          sx={{
            backgroundColor: "#C0392B",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 2.5,
            px: 2.5,
            py: 1.2,
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { backgroundColor: "#A93226" },
            "&.Mui-disabled": {
              backgroundColor: "#C0392B",
              opacity: 0.4,
              color: "#fff",
            },
          }}
        >
          {isCashingOut
            ? "Memproses..."
            : cashoutSuccess
              ? "Berhasil!"
              : "Cairkan"}
        </Button>
      </Box>

      {!hasAmount && (
        <Typography sx={{ fontSize: 12, color: "#bbb", mt: 1 }}>
          Belum ada komisi yang siap dicairkan
        </Typography>
      )}
    </Box>
  );
}
