import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true, // Użycie polling dla Docker
        },
        host: true, // Umożliwienie dostępu z zewnątrz
        port: 5173, // Port musi być zgodny z `docker-compose.yml`
    },
});
