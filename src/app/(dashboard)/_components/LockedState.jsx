"use client";

import { Box, Typography, LinearProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UNLOCK_THRESHOLD } from "@/lib/tierConfig";
import { formatPrice} from "@/utils/string"

export default function LockedState({ handler }) {
    console.log("LockedState rendered, handler.isAffiliate:", handler.isAffiliate);
    const { totalSpend, unlockProgress, unlockRemaining } = handler;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Hero lock card */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          p: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#FAEAEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ color: "#C0392B", fontSize: 28 }} />
        </Box>

        <Typography
          sx={{ fontWeight: 600, fontSize: 17, mb: 1, color: "#1a1a1a" }}
        >
          Fitur affiliate terkunci
        </Typography>

        <Typography
          sx={{ fontSize: 14, color: "#666", lineHeight: 1.6, mb: 3 }}
        >
          Belanjakan total{" "}
          <Box component="span" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
            {formatPrice(UNLOCK_THRESHOLD)}
          </Box>{" "}
          pada transaksi selesai untuk membuka kode affiliate dan mulai
          mendapatkan komisi.
        </Typography>

        {/* Progress */}
        <Box sx={{ textAlign: "left" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontSize: 12, color: "#aaa" }}>
              Progress pengeluaranmu
            </Typography>
            <Typography
              sx={{ fontSize: 13, fontWeight: 700, color: "#C0392B" }}
            >
              {formatPrice(totalSpend)} / {formatPrice(UNLOCK_THRESHOLD)}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={unlockProgress}
            sx={{
              height: 8,
              borderRadius: 100,
              backgroundColor: "#f0f0f0",
              mb: 1,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#C0392B",
                borderRadius: 100,
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 12, color: "#bbb" }}>
              {unlockProgress}% tercapai
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#bbb" }}>
              {formatPrice(unlockRemaining)} lagi
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            p: "10px 14px",
            backgroundColor: "#FAEAEA",
            borderRadius: 2,
            fontSize: 13,
            fontWeight: 700,
            color: "#C0392B",
          }}
        >
          {formatPrice(unlockRemaining)} lagi untuk buka fitur affiliator
        </Box>
      </Box>

      {/* Dimmed code preview */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          p: 2,
          opacity: 0.4,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        <Typography sx={{ fontSize: 12, color: "#aaa", mb: 1 }}>
          Kode affiliate kamu
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            sx={{
              flex: 1,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "#ccc",
              fontFamily: "monospace",
            }}
          >
            — — — —
          </Typography>
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              border: "0.5px solid #ddd",
              backgroundColor: "#f5f5f5",
              fontSize: 13,
              color: "#bbb",
            }}
          >
            Salin
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
