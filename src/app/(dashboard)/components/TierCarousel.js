"use client";

import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TIER_CONFIG, formatRupiah } from "@/lib/tierConfig";

export default function TierCarousel({ handler }) {
  const {
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
  } = handler;

    function renderProgress() {
        const nextTier = TIER_CONFIG[viewedTierIndex + 1];

        if (viewedTierIndex < currentTierIndex) {
            return (
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                            Tier ini sudah dilewati
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: viewedTier.color }}>
                            100%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            height: 6,
                            borderRadius: 100,
                            backgroundColor: "#f0f0f0",
                            mb: 1,
                            "& .MuiLinearProgress-bar": { backgroundColor: viewedTier.color },
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            {formatRupiah(viewedTier.min)} / {formatRupiah(viewedTier.min)}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            Tercapai
                        </Typography>
                    </Box>
                </Box>
            );
        }

        if (viewedTierIndex > currentTierIndex) {
            return (
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                            Belum terbuka
                        </Typography>
                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: 11, fontWeight: 700, color: "#aaa" }}>
                            <LockOutlinedIcon sx={{ fontSize: 12 }} />
                            Terkunci
                        </Box>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                            height: 6,
                            borderRadius: 100,
                            backgroundColor: "#f0f0f0",
                            mb: 1,
                            "& .MuiLinearProgress-bar": { backgroundColor: viewedTier.color },
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            {formatRupiah(totalVolume)} / {formatRupiah(viewedTier.min)}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            {formatRupiah(Math.max(0, viewedTier.min - totalVolume))} lagi
                        </Typography>
                    </Box>
                </Box>
            );
        }

        // Gold — max tier
        if (!nextTier) {
            return (
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                            Tier tertinggi tercapai
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: viewedTier.color }}>
                            Max
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            height: 6,
                            borderRadius: 100,
                            backgroundColor: "#f0f0f0",
                            mb: 1,
                            "& .MuiLinearProgress-bar": { backgroundColor: viewedTier.color },
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            {formatRupiah(totalVolume)}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                            Tidak ada batas atas
                        </Typography>
                    </Box>
                </Box>
            );
        }

        const progressPct = Math.min(100, Math.round((totalVolume / nextTier.min) * 100));
        const remaining = Math.max(0, nextTier.min - totalVolume);

        return (
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                        Progress ke {nextTier.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: viewedTier.color }}>
                        {progressPct}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progressPct}
                    sx={{
                        height: 6,
                        borderRadius: 100,
                        backgroundColor: "#f0f0f0",
                        mb: 1,
                        "& .MuiLinearProgress-bar": { backgroundColor: viewedTier.color },
                    }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                        {formatRupiah(totalVolume)} / {formatRupiah(nextTier.min)}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: "#bbb" }}>
                        {formatRupiah(remaining)} lagi ke {nextTier.name}
                    </Typography>
                </Box>
            </Box>
        );
    }  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: 3, p: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <IconButton
          onClick={handleCarouselPrev}
          disabled={viewedTierIndex === 0}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: "#f5f5f5",
            "&:hover": { backgroundColor: "#ebebeb" },
          }}
          aria-label="Tier sebelumnya"
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: viewedTier.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarIcon sx={{ fontSize: 18, color: viewedTier.color }} />
            </Box>
            <Typography
              sx={{ fontSize: 20, fontWeight: 700, color: viewedTier.color }}
            >
              {viewedTier.name}
            </Typography>
          </Box>

          {isViewingCurrentTier ? (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.4,
                borderRadius: 100,
                backgroundColor: viewedTier.bgColor,
                border: `0.5px solid ${viewedTier.color}40`,
                fontSize: 11,
                fontWeight: 700,
                color: viewedTier.color,
                mb: 1.5,
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 13 }} />
              Tier kamu sekarang
            </Box>
          ) : (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.4,
                borderRadius: 100,
                backgroundColor: "#f0f0f0",
                border: "0.5px solid rgba(0,0,0,0.1)",
                fontSize: 11,
                fontWeight: 700,
                color: "#aaa",
                mb: 1.5,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 12 }} />
              Terkunci
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pt: 1.5,
              borderTop: "0.5px solid rgba(0,0,0,0.08)",
            }}
          >
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: 11, color: "#aaa", mb: 0.3 }}>
                Komisi
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: viewedTier.color }}
              >
                {viewedTier.rate}%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "0.5px",
                height: 32,
                backgroundColor: "rgba(0,0,0,0.08)",
              }}
            />
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: 11, color: "#aaa", mb: 0.3 }}>
                Volume min
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}
              >
                {viewedTier.min === 0 ? "—" : formatRupiah(viewedTier.min)}
              </Typography>
            </Box>
            {viewedTier.next && (
              <>
                <Box
                  sx={{
                    width: "0.5px",
                    height: 32,
                    backgroundColor: "rgba(0,0,0,0.08)",
                  }}
                />
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography sx={{ fontSize: 11, color: "#aaa", mb: 0.3 }}>
                    Volume max
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}
                  >
                    {formatRupiah(viewedTier.next)}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={handleCarouselNext}
          disabled={viewedTierIndex === TIER_CONFIG.length - 1}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: "#f5f5f5",
            "&:hover": { backgroundColor: "#ebebeb" },
          }}
          aria-label="Tier berikutnya"
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 1.5 }}
      >
        {TIER_CONFIG.map((t, i) => (
          <Box
            key={t.key}
            onClick={() => handleCarouselDot(i)}
            role="button"
            aria-label={`${t.name} tier`}
            aria-selected={i === viewedTierIndex}
            sx={{
              width: i === viewedTierIndex ? 20 : 6,
              height: 6,
              borderRadius: 100,
              backgroundColor: i === viewedTierIndex ? t.color : "#ddd",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          />
        ))}
      </Box>

      <Box sx={{ mt: 2, pt: 2, borderTop: "0.5px solid rgba(0,0,0,0.06)" }}>
        {renderProgress()}
      </Box>
    </Box>
  );
}
