import React from 'react';
import { Grid as MuiGrid } from '@mui/material';

// This component fixes the TypeScript issues with Material UI Grid
interface CustomGridProps {
  item?: boolean;
  container?: boolean;
  xs?: number | boolean;
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  xl?: number | boolean;
  spacing?: number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: string;
  alignItems?: string;
  key?: any;
  sx?: any;
  children?: React.ReactNode;
  [key: string]: any; // To allow other props to pass through
}

const Grid: React.FC<CustomGridProps> = (props) => {
  return <MuiGrid {...props} />;
};

export default Grid;
