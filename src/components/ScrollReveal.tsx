'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Elements that we want to reveal individually
    const individualSelectors = [
      '.card',
      '.section-title',
      '.main-title',
      '.project-card',
      '.form-wrapper',
      '.hero-content-home',
      '.timeline-item',
      '.about-image',
      '.about-text',
      '.section-title-with-icon',
      '.partner-logo'
    ];

    // 2. Grids and lists whose children should stagger-animate
    const staggerSelectors = [
      '.grid-2-col',
      '.grid-3-col',
      '.grid-4-col',
      '.stats-grid',
      '.check-list',
      '.filter-container',
      '.gallery-grid'
    ];

    // Wait a brief moment for the page content to fully mount/render
    const timer = setTimeout(() => {
      // Add individual reveal classes
      const individualElements = document.querySelectorAll(individualSelectors.join(', '));
      individualElements.forEach((el) => {
        // Only add if it doesn't already have a reveal class
        if (!el.classList.contains('reveal') && !el.closest('.reveal-stagger')) {
          el.classList.add('reveal', 'reveal-slide-up');
        }
      });

      // Add stagger reveal classes
      const staggerElements = document.querySelectorAll(staggerSelectors.join(', '));
      staggerElements.forEach((el) => {
        if (!el.classList.contains('reveal-stagger')) {
          el.classList.add('reveal-stagger');
        }
      });

      // Set up Intersection Observer
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // triggers when element is 10% inside the viewport
        threshold: 0.05,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we unobserve to keep the state clean
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all individual reveal elements
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
      });

      // Observe all stagger containers
      document.querySelectorAll('.reveal-stagger').forEach((el) => {
        observer.observe(el);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

