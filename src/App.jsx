import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import EnquireTab from "@/components/EnquireTab";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Industries from "@/pages/Industries";
import Legacy from "@/pages/Legacy";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Lenis momentum scrolling + scroll reset on route change.
function ScrollSystem() {
    const { pathname } = useLocation();
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;
        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    useEffect(() => {
        window.__lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function AnimatedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
            <Route path="/products/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
            <Route path="/legacy" element={<PageTransition><Legacy /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
    );
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <BrowserRouter>
                <ScrollSystem />
                <Cursor />
                <div aria-hidden="true" className="grain-overlay fixed inset-0 z-[70] pointer-events-none" />
                <Header />
                <AnimatedRoutes />
                <Footer />
                <EnquireTab />
            </BrowserRouter>
        </MotionConfig>
    );
}
