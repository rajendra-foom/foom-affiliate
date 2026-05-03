"use client";
import { Error, Refresh, Warning } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";
import useAuthenticatePageHandler from "./_handler/useAuthenticatePageHandler";

export default function AuthenticatePage() {
    const handler = useAuthenticatePageHandler();

    if (handler.isLoading || handler.isSuccess) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (handler.isLoginRequired) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <Card sx={{ maxWidth: 400, width: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                        <Warning sx={{ fontSize: 60, color: "warning.main", mb: 2 }} />
                        <Alert severity="warning">
                            Pastikan anda mengakses halaman ini dari aplikasi
                        </Alert>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    if (handler.isError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <Card sx={{ maxWidth: 400, width: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                        <Error sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
                        <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                            {handler.errorMessage}
                        </Alert>
                        {handler.canRetry && (
                            <Button
                                variant="contained"
                                startIcon={<Refresh />}
                                onClick={handler.handleRetry}
                                fullWidth
                            >
                                Coba Lagi
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return null;
}