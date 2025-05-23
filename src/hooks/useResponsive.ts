import { useMediaQuery, useTheme, Theme } from '@mui/material';

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ResponsiveHelpers {
  /**
   * Is the current screen smaller than the given breakpoint
   */
  isSmaller: (key: BreakpointKey) => boolean;
  /**
   * Is the current screen larger than the given breakpoint
   */
  isLarger: (key: BreakpointKey) => boolean;
  /**
   * Is the current screen exactly the given breakpoint
   */
  is: (key: BreakpointKey) => boolean;
  /**
   * Is the current screen in mobile viewport (< sm)
   */
  isMobile: boolean;
  /**
   * Is the current screen in tablet viewport (>= sm and < lg)
   */
  isTablet: boolean;
  /**
   * Is the current screen in desktop viewport (>= lg)
   */
  isDesktop: boolean;
}

const useResponsive = (): ResponsiveHelpers => {
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  const isSmaller = (key: BreakpointKey): boolean => {
    switch (key) {
      case 'sm': return isMobile;
      case 'md': return isMobile || isTablet;
      case 'lg': return !isDesktop;
      case 'xl': return !isDesktop;
      default: return false;
    }
  };

  const isLarger = (key: BreakpointKey): boolean => {
    switch (key) {
      case 'xs': return true;
      case 'sm': return !isMobile;
      case 'md': return isDesktop;
      case 'lg': return isDesktop;
      case 'xl': return isDesktop;
      default: return false;
    }
  };
  
  const is = (key: BreakpointKey): boolean => {
    switch (key) {
      case 'xs': return isXs;
      case 'sm': return isSm;
      case 'md': return isMd;
      case 'lg': return isLg;
      case 'xl': return isXl;
      default: return false;
    }
  };
  
  return {
    isSmaller,
    isLarger,
    is,
    isMobile,
    isTablet,
    isDesktop
  };
};

export default useResponsive;
