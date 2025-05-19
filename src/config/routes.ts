/**
 * Application Routes Configuration
 *
 * Centralized route paths and configuration for the application.
 * Use these constants for navigation and route definitions.
 */

export const ROUTES = {
  HOME: '/',
  CHECKOUT: '/checkout',
  NOT_FOUND: '*',
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];
