import { useEffect } from "react";

// Static frontend SEO — sets per-route title + description. No backend.
export default function usePageMeta(title, description) {
    useEffect(() => {
        document.title = title;
        const meta = document.querySelector('meta[name="description"]');
        if (meta && description) meta.setAttribute("content", description);
    }, [title, description]);
}
