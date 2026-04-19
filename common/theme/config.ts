// Centralized theme configuration for the React course
// Change the theme here and it will apply everywhere

export const THEME_CONFIG = {
  // Choose your neversink theme scheme
  // Options: white, black, dark, light, navy, navy-light, slate, gray, zinc, neutral, stone,
  //          red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue,
  //          indigo, violet, purple, fuchsia, pink, rose
  // Add -light or -scheme suffix (e.g., 'indigo-light-scheme', 'blue-scheme')
  scheme: 'neversink-sky-light-scheme' as string,

  // The current active module. Modules before this one will be marked as complete.
  currentModule: '11-routing' as string,

  // You can also define custom CSS variables that will be available globally
  customVars: {} as Record<string, string>
  // Example:
  // customVars: {
  //   '--custom-accent': '#your-color',
  // } as Record<string, string>
}

export type ThemeScheme = typeof THEME_CONFIG.scheme
