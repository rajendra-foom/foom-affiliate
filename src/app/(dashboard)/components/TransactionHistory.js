"use client";

import { Box, Typography, Skeleton, Button } from "@mui/material";
import { formatRupiah, formatDate } from "@/lib/tierConfig";

function HistoryItem({ item, rate }) {
    const isReady = item.status === "ready";

    const benefitAmount = isReady
        ? item.transaction_amount * (rate / 100)
        : item.benefit_amount;

    const displayRate = isReady ? rate : item.rate_snapshot;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2.5,
                py: 1.5,
                borderBottom: "0.5px solid rgba(0,0,0,0.05)",
                "&:last-child": { borderBottom: "none" },
            }}
        >
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    flexShrink: 0,
                    backgroundColor: isReady ? "#1a7a4a" : "#ccc",
                }}
                aria-hidden="true"
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        mb: 0.3,
                    }}
                >
                    <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                        {formatDate(item.createdAt)}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: isReady ? "#1a7a4a" : "#aaa",
                        }}
                    >
                        {isReady ? "+" : ""}
                        {formatRupiah(benefitAmount)}
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        fontSize: 12,
                        color: "#bbb",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    Transaksi {formatRupiah(item.transaction_amount)} · rate {displayRate}%
                </Typography>

                {isReady && (
                    <Typography sx={{ fontSize: 10, color: "#aaa", fontStyle: "italic", mt: 0.3 }}>
                        estimasi · bisa berubah jika tier naik
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    px: 1,
                    py: 0.3,
                    borderRadius: 100,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                    backgroundColor: isReady ? "#e6f4ec" : "#f5f5f5",
                    color: isReady ? "#1a7a4a" : "#aaa",
                }}
            >
                {isReady ? "Estimasi" : "Dicairkan"}
            </Box>
        </Box>
    );
}

export default function TransactionHistory({ handler }) {
    const {
        history,
        isHistoryLoading,
        affiliate,
        historyPagination,
        historyPage,
        handleNextPage,
        handlePrevPage,
    } = handler;
    const rate = affiliate?.rate ?? 5;

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2.5,
                    py: 1.75,
                    borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                }}
            >
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>
                    Riwayat transaksi
                </Typography>
                {!isHistoryLoading && (
                    <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                        {historyPagination?.total_item ?? history.length} entri
                    </Typography>
                )}
            </Box>

            {/* Body */}
            {isHistoryLoading ? (
                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                    }}
                >
                    {[1, 2, 3].map((n) => (
                        <Skeleton
                            key={n}
                            variant="rounded"
                            height={44}
                            sx={{ borderRadius: 2 }}
                        />
                    ))}
                </Box>
            ) : history.length === 0 ? (
                <Typography
                    sx={{ fontSize: 13, color: "#bbb", textAlign: "center", py: 4 }}
                >
                    Belum ada transaksi yang menggunakan kode kamu
                </Typography>
            ) : (
                history.map((item, index) => (
                    <HistoryItem key={index} item={item} rate={rate} />
                ))
            )}

            {/* Pagination */}
            {historyPagination && historyPagination.total_pages > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2.5,
                        py: 1.5,
                        borderTop: "0.5px solid rgba(0,0,0,0.06)",
                    }}
                >
                    <Button
                        onClick={handlePrevPage}
                        disabled={!historyPagination.has_prev}
                        size="small"
                        sx={{ fontSize: 12, color: "#666", textTransform: "none" }}
                    >
                        ← Sebelumnya
                    </Button>
                    <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                        {historyPage} / {historyPagination.total_pages}
                    </Typography>
                    <Button
                        onClick={handleNextPage}
                        disabled={!historyPagination.has_next}
                        size="small"
                        sx={{ fontSize: 12, color: "#666", textTransform: "none" }}
                    >
                        Berikutnya →
                    </Button>
                </Box>
            )}
        </Box>
    );
}