"use client";

import { Box, Typography } from "@mui/material";

export default function AffiliateCode({ handler }) {
    const { code, codeCopied, handleCopyCode } = handler;

    return (
        <Box sx={{ backgroundColor: "#fff", borderRadius: 3, p: 2.5 }}>
            <Typography sx={{ fontSize: 12, color: "#aaa", mb: 1 }}>
                Kode affiliate kamu
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Typography
                    sx={{
                        flex: 1,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "#1a1a1a",
                        fontFamily: "monospace",
                    }}
                >
                    {code}
                </Typography>

                <Box
                    component="button"
                    onClick={handleCopyCode}
                    sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: codeCopied
                            ? "0.5px solid #1a7a4a40"
                            : "0.5px solid rgba(0,0,0,0.15)",
                        backgroundColor: codeCopied ? "#e6f4ec" : "#f5f5f5",
                        fontSize: 13,
                        fontWeight: 700,
                        color: codeCopied ? "#1a7a4a" : "#1a1a1a",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s",
                        fontFamily: "inherit",
                    }}
                    aria-label="Salin kode affiliate"
                >
                    {codeCopied ? "Tersalin!" : "Salin"}
                </Box>
            </Box>

            <Box
                sx={{
                    p: "10px 14px",
                    backgroundColor: "#f8f8f8",
                    borderRadius: 2,
                    fontSize: 12,
                    color: "#888",
                    lineHeight: 1.5,
                }}
            >
                Pembeli yang menggunakan kode ini mendapat diskon 10% dari total pesanan
            </Box>
        </Box>
    );
}