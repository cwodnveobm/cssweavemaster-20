import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Simplified lazy loading with single loading state
const lazyLoadWithRetry = (importFn) => {
  const LazyComponent = lazy(() => 
    importFn().catch((err) => {
      console.error('Error loading component:', err);
      return importFn(); // Retry once
    })
  );

  return (props) => (
    <ErrorBoundary>
      <LazyComponent {...props} />
    </ErrorBoundary>
  );
};

// Lazy load components
const Header = lazyLoadWithRetry(() => import('./components/Header'));
const Footer = lazyLoadWithRetry(() => import('./components/Footer'));
const Home = lazyLoadWithRetry(() => import('./pages/Home'));
const Shop = lazyLoadWithRetry(() => import('./pages/Shop'));
const Services = lazyLoadWithRetry(() => import('./pages/Services'));
const Workshop = lazyLoadWithRetry(() => import('./pages/Workshop'));
const Contact = lazyLoadWithRetry(() => import('./pages/Contact'));
const Cart = lazyLoadWithRetry(() => import('./pages/Cart'));
const About = lazyLoadWithRetry(() => import('./pages/About'));
const SavedItems = lazyLoadWithRetry(() => import('./pages/SavedItems'));
const SearchResults = lazyLoadWithRetry(() => import('./pages/SearchResults'));
const TermsAndConditions = lazyLoadWithRetry(() => import('./pages/TermsAndConditions'));
const CancellationAndRefund = lazyLoadWithRetry(() => import('./pages/CancellationAndRefund'));
const ShippingAndPrivacy = lazyLoadWithRetry(() => import('./pages/ShippingAndPrivacy'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <ErrorBoundary>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'white',
                  color: '#0F4C3A',
                  border: '1px solid #E2E8F0',
                },
                duration: 3000,
              }}
            />
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-white">
                <LoadingSpinner size="large" />
              </div>
            }>
              <Router>
                <div className="flex flex-col min-h-screen bg-white">
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/workshop" element={<Workshop />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/saved" element={<SavedItems />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/cancellation-and-refund" element={<CancellationAndRefund />} />
                      <Route path="/shipping-and-privacy" element={<ShippingAndPrivacy />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </Suspense>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;