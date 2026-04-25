import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

// Pages — lazy-loaded for performance
const Home = lazy(() => import("./pages/Home"));
const Programs = lazy(() => import("./pages/Programs"));
const Products = lazy(() => import("./pages/Products"));
const LabPackages = lazy(() => import("./pages/LabPackages"));
const CSRPartners = lazy(() => import("./pages/CSRPartners"));
const Certification = lazy(() => import("./pages/Certification"));

// ── Scroll to top on every route change ──
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Loading fallback ──
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: ".8rem",
        color: "var(--fog)",
        letterSpacing: ".1em",
      }}
    >
      ⏳ Loading...
    </div>
  );
}

// ── Layout wrapper (Navbar + page + Footer + WA float) ──
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar = ["/products", "/lab-packages", "/csr-partners"].includes(
    location.pathname,
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      <Footer />
      <a
        href="https://wa.me/918699929532"
        className="wa-float"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp ARC LABS"
      >
        💬
      </a>
    </>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/lab-packages" element={<LabPackages />} />
            <Route path="/csr-partners" element={<CSRPartners />} />
            <Route path="/verify" element={<Certification />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", padding: "120px 5vw" }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "4rem",
                      fontWeight: 800,
                      color: "var(--teal)",
                      marginBottom: "1rem",
                    }}
                  >
                    404
                  </div>
                  <div style={{ color: "var(--fog)", marginBottom: "1.5rem" }}>
                    Page not found
                  </div>
                  <a href="/" className="btn-primary">
                    ← Back to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
