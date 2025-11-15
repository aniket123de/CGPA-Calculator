import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { calculateSem1SGPA, calculateSem2SGPA, calculateSem3SGPA, calculateSem4SGPA, calculateSem5SGPA, calculateSem6SGPA, calculateCumulativeGPA, calculateSemesterGPA } from './utils/cgpaCalculator';
import { ThemeProvider } from '@mui/material/styles';
import createAppTheme from './theme/theme';
import useResponsive from './hooks/useResponsive';
import { 
  Container, Box, Typography, FormControl, 
  InputLabel, MenuItem, Select, TextField, Button, 
  Paper, AppBar, Toolbar, Card, CardContent,
  IconButton, Tooltip, Stack, Divider, Chip, 
  LinearProgress, SelectChangeEvent, Tab, Tabs, Fade,
  Avatar, useMediaQuery, Drawer, List, ListItem,
  ListItemText, ListItemIcon, ListItemButton, SwipeableDrawer,
  CssBaseline, Snackbar, Alert, AlertColor
} from '@mui/material';
import Grid from './components/MuiGridFix';
import {
  Calculate as CalculateIcon,
  School as SchoolIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Grade as GradeIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Restore as RestoreIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Analytics as AnalyticsIcon,
  ImportExport as ImportExportIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SemesterCard from './components/SemesterCard';
import AnalyticsView from './components/AnalyticsView';
import DataManagement from './components/DataManagement';
import { Course, Semester, SemesterData } from './types/types';

// Definitions of semesters with their subjects and calculation functions
const semesterSubjects: SemesterData[] = [
  {
    id: 1,
    name: 'Semester 1',
    subjects: [
      { name: 'Physics Lab', credits: 1.5 },
      { name: 'Electrical Lab', credits: 1 },
      { name: 'Mechanical Lab', credits: 3 },
      { name: 'Physics Theory', credits: 4 },
      { name: 'Electrical Theory', credits: 4 },
      { name: 'Math Theory', credits: 4 }
    ],
    calc: calculateSem1SGPA,
    color: '#3f51b5',
    icon: 'school'
  },
  {
    id: 2,
    name: 'Semester 2',
    subjects: [
      { name: 'Chemistry Lab', credits: 1.5 },
      { name: 'C Lab', credits: 2 },
      { name: 'Graphics Lab', credits: 3 },
      { name: 'English Lab', credits: 1 },
      { name: 'Chemistry Theory', credits: 4 },
      { name: 'C Theory', credits: 3 },
      { name: 'Math Theory', credits: 4 },
      { name: 'English Theory', credits: 2 }
    ],
    calc: calculateSem2SGPA,
    color: '#2196f3',
    icon: 'calculate'
  },
  {
    id: 3,
    name: 'Semester 3',
    subjects: [
      { name: 'Computer Organization', credits: 3 },
      { name: 'DSA', credits: 3 },
      { name: 'Analog and Digital Electronics', credits: 3 },
      { name: 'Mathematics', credits: 2 },
      { name: 'Economics', credits: 3 },
      { name: 'Computer Organization Lab', credits: 2 },
      { name: 'DSA Lab', credits: 2 },
      { name: 'Analog and Digital Electronics Lab', credits: 2 },
      { name: 'Python Lab', credits: 2 }
    ],
    calc: calculateSem3SGPA,
    color: '#4caf50',
    icon: 'terminal'
  },
  {
    id: 4,
    name: 'Semester 4',
    subjects: [
      { name: 'Discrete Mathematics', credits: 4 },
      { name: 'Computer Architecture', credits: 3 },
      { name: 'Automata', credits: 3 },
      { name: 'DAA', credits: 3 },
      { name: 'Biology', credits: 3 },
      { name: 'EVS', credits: 1 },
      { name: 'DAA Lab', credits: 2 },
      { name: 'Computer Architecture Lab', credits: 2 }
    ],
    calc: calculateSem4SGPA,
    color: '#ff9800',
    icon: 'code'
  },
  {
    id: 5,
    name: 'Semester 5',
    subjects: [
      { name: 'OOPS', credits: 3 },
      { name: 'SOFTWARE ENGINEERING', credits: 3 },
      { name: 'AI', credits: 3 },
      { name: 'OS', credits: 3 },
      { name: 'COMPILER DESIGN', credits: 3 },
      { name: 'INDUSTRIAL MANAGEMENT', credits: 3 },
      { name: 'OOPS Lab', credits: 2 },
      { name: 'SOFTWARE Lab', credits: 2 },
      { name: 'OS Lab', credits: 2 }
    ],
    calc: calculateSem5SGPA,
    color: '#9c27b0',
    icon: 'development'
  },
  {
    id: 6,
    name: 'Semester 6',
    subjects: [
      { name: 'OOPS', credits: 3 },
      { name: 'SOFTWARE ENGINEERING', credits: 3 },
      { name: 'AI', credits: 3 },
      { name: 'OS', credits: 3 },
      { name: 'COMPILER DESIGN', credits: 3 },
      { name: 'INDUSTRIAL MANAGEMENT', credits: 3 },
      { name: 'OOPS Lab', credits: 2 },
      { name: 'SOFTWARE Lab', credits: 2 },
      { name: 'OS Lab', credits: 2 }
    ],
    calc: calculateSem6SGPA,
    color: '#e91e63',
    icon: 'advanced'
  }
];

// Define interface for saved grades data
interface SavedGradesData {
  [key: number]: { grades: string[], sgpa: number };
}

function App() {
  const [selectedSem, setSelectedSem] = useState<number>(0);
  const [grades, setGrades] = useState<string[]>(Array(semesterSubjects[0].subjects.length).fill(''));
  const [sgpa, setSgpa] = useState<number>(0);
  const [cgpa, setCgpa] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [allSemesterGrades, setAllSemesterGrades] = useState<SavedGradesData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { isMobile, isTablet } = useResponsive();
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Load saved grades from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('savedGrades');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as SavedGradesData;
        setAllSemesterGrades(parsedData);
        
        // If we have grades for the currently selected semester, load them
        if (parsedData[selectedSem]) {
          setGrades(parsedData[selectedSem].grades);
          setSgpa(parsedData[selectedSem].sgpa);
        }
        
        // Calculate CGPA based on all saved semester grades
        calculateOverallCGPA(parsedData);
      } catch (e) {
        console.error('Error loading saved grades', e);
      }
    }
    
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  const handleSemesterChange = (event: SelectChangeEvent<number>) => {
    const semIdx = Number(event.target.value);
    setSelectedSem(semIdx);
    
    // If we have saved grades for this semester, load them
    if (allSemesterGrades[semIdx]) {
      setGrades(allSemesterGrades[semIdx].grades);
      setSgpa(allSemesterGrades[semIdx].sgpa);
    } else {
      // Otherwise reset grades
      setGrades(Array(semesterSubjects[semIdx].subjects.length).fill(''));
      setSgpa(0);
    }
  };

  const handleGradeChange = (idx: number, value: string) => {
    const newGrades = [...grades];
    // Only allow numbers 0-10 or empty string
    if (/^$|^(10|[0-9])$/.test(value)) {
      newGrades[idx] = value;
      setGrades(newGrades);
    }
  };

  const calculateSGPA = () => {
    setLoading(true);
    
    // Simulate a short loading period for better UI feedback
    setTimeout(() => {
      // Convert to numbers, treat empty as 0
      const numericGrades = grades.map(g => g === '' ? 0 : Number(g));
      const sgpaValue = semesterSubjects[selectedSem].calc(numericGrades);
      setSgpa(sgpaValue);
      
      // Save this semester's grades and SGPA
      const updatedAllGrades = {
        ...allSemesterGrades,
        [selectedSem]: { grades, sgpa: sgpaValue }
      };
      
      setAllSemesterGrades(updatedAllGrades);
      localStorage.setItem('savedGrades', JSON.stringify(updatedAllGrades));
      
      // Recalculate CGPA
      calculateOverallCGPA(updatedAllGrades);
      
      setLoading(false);
      setSaveStatus('Grades saved successfully!');
      setSnackbarMessage('Grades saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => setSaveStatus(''), 3000);
    }, 800);
  };
  
  const calculateOverallCGPA = (gradesData: SavedGradesData) => {
    // Calculate CGPA based on all saved semester SGPAs
    const semesterSGPAs = Object.values(gradesData).map(semData => semData.sgpa);
    if (semesterSGPAs.length > 0) {
      const cgpaValue = semesterSGPAs.reduce((sum, sgpa) => sum + sgpa, 0) / semesterSGPAs.length;
      setCgpa(cgpaValue);
    }
  };
  
  const resetSemesterGrades = () => {
    setGrades(Array(semesterSubjects[selectedSem].subjects.length).fill(''));
    setSgpa(0);
    
    // Remove this semester from saved grades
    const updatedAllGrades = { ...allSemesterGrades };
    delete updatedAllGrades[selectedSem];
    
    setAllSemesterGrades(updatedAllGrades);
    localStorage.setItem('savedGrades', JSON.stringify(updatedAllGrades));
    calculateOverallCGPA(updatedAllGrades);
    
    setSaveStatus('Grades reset successfully!');
    setSnackbarMessage('Grades reset successfully!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
    setTimeout(() => setSaveStatus(''), 3000);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Apply the selected theme mode
  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply base styling according to theme */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={0} color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              CGPA Calculator
            </Typography>
            <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Drawer for mobile navigation */}
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
          disableBackdropTransition={!isMobile}
          disableDiscovery={isMobile}
          swipeAreaWidth={isMobile ? 30 : 0}
        >
          <Box 
            sx={{ 
              width: { xs: '85vw', sm: 300 },
              maxWidth: '100%'
            }} 
            role="presentation"
          >
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                CGPA Calculator
              </Typography>
              <IconButton 
                edge="end" 
                color="inherit" 
                onClick={() => setDrawerOpen(false)}
                aria-label="close drawer"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Divider />
            <List sx={{ py: 1 }}>
              <ListItemButton 
                selected={currentTab === 0} 
                onClick={() => { setCurrentTab(0); setDrawerOpen(false); }}
                sx={{ py: isMobile ? 1.5 : 1 }}
              >
                <ListItemIcon>
                  <CalculateIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Calculate SGPA" />
              </ListItemButton>
              <ListItemButton 
                selected={currentTab === 1} 
                onClick={() => { setCurrentTab(1); setDrawerOpen(false); }}
                sx={{ py: isMobile ? 1.5 : 1 }}
              >
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
              <ListItemButton sx={{ py: isMobile ? 1.5 : 1 }}>
                <ListItemIcon>
                  <HistoryIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Grade History" />
              </ListItemButton>
              <ListItemButton sx={{ py: isMobile ? 1.5 : 1 }}>
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </List>
          </Box>
        </SwipeableDrawer>

        {/* Main Content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: { xs: 2, sm: 3, md: 4 }, 
            mb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2, md: 3 }
          }}
        >
          {/* Tabs for different views */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mb: { xs: 2, sm: 3 }, 
            mx: { xs: -1, sm: 0 }
          }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="calculator tabs"
              variant={isMobile ? "fullWidth" : "standard"}
              centered
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
              sx={{
                minHeight: { xs: '48px', sm: '56px' },
                '& .MuiTab-root': {
                  minHeight: { xs: '48px', sm: '56px' },
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' }
                }
              }}
            >
              <Tab 
                icon={<CalculateIcon fontSize={isMobile ? "small" : "medium"} />} 
                label="Calculate SGPA" 
                iconPosition="start" 
                sx={{ 
                  textTransform: 'none',
                  px: { xs: 1, sm: 2 }
                }}
              />
              <Tab 
                icon={<DashboardIcon fontSize={isMobile ? "small" : "medium"} />} 
                label="Overview" 
                iconPosition="start" 
                sx={{ 
                  textTransform: 'none',
                  px: { xs: 1, sm: 2 }
                }}
              />
            </Tabs>
          </Box>
          
          {/* Tab Content: Calculate SGPA */}
          <div role="tabpanel" hidden={currentTab !== 0}>
            {currentTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Removed Card structure, replaced with Stack for clean stacking */}
                <Stack spacing={3} sx={{ mb: { xs: 2, sm: 3 } }}>
                  <Box sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: 'background.paper',
                    borderRadius: { xs: 2, sm: 3 },
                    boxShadow: 1
                  }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'medium',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      SGPA Calculator
                    </Typography>
                    <Divider sx={{ mb: { xs: 2, sm: 3 } }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="semester-select-label">Select Semester</InputLabel>
                          <Select
                            labelId="semester-select-label"
                            id="semester-select"
                            value={selectedSem}
                            label="Select Semester"
                            onChange={handleSemesterChange}
                            sx={{ 
                              height: { xs: '56px', sm: 'auto' },
                              '& .MuiSelect-select': {
                                fontSize: { xs: '0.95rem', sm: '1rem' }
                              }
                            }}
                          >
                            {semesterSubjects.map((sem, idx) => (
                              <MenuItem key={sem.name} value={idx}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <Avatar 
                                    sx={{ 
                                      width: { xs: 28, sm: 24 }, 
                                      height: { xs: 28, sm: 24 }, 
                                      bgcolor: sem.color, 
                                      fontSize: '0.875rem' 
                                    }}
                                  >
                                    {sem.id}
                                  </Avatar>
                                  <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                                    {sem.name}
                                  </Typography>
                                </Stack>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 'medium', 
                          color: 'primary.main',
                          fontSize: { xs: '1rem', sm: '1.25rem' },
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {semesterSubjects[selectedSem].name} Subjects
                      </Typography>
                      <Stack spacing={2}>
                        {semesterSubjects[selectedSem].subjects.map((subject, idx) => (
                          <Stack
                            key={subject.name}
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                            sx={{
                              p: { xs: 1.5, sm: 2 },
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: { xs: 1.5, sm: 2 },
                              minHeight: 80,
                              bgcolor: 'background.default',
                              width: '100%'
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: 'medium',
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                mb: { xs: 1, sm: 0 },
                                flex: 1
                              }}
                            >
                              {subject.name}
                            </Typography>
                            <Chip 
                              label={`${subject.credits} credits`} 
                              size={isMobile ? "small" : "medium"} 
                              color="primary" 
                              variant="outlined"
                              sx={{ 
                                height: { xs: '24px', sm: '32px' },
                                '& .MuiChip-label': {
                                  px: { xs: 1, sm: 1.5 }
                                }
                              }}
                            />
                            <TextField
                              label="Grade"
                              variant="outlined"
                              size={isMobile ? "small" : "medium"}
                              value={grades[idx]}
                              onChange={e => handleGradeChange(idx, e.target.value)}
                              placeholder="0-10"
                              type="text"
                              inputMode="numeric"
                              inputProps={{ 
                                maxLength: 2, 
                                pattern: "^(10|[0-9])$",
                                style: { 
                                  textAlign: 'center',
                                  fontSize: isMobile ? '1rem' : '1.1rem',
                                  padding: isMobile ? '8px' : '14px'
                                }
                              }}
                              sx={{ 
                                width: { xs: 70, sm: 80 },
                                ml: 'auto'
                              }}
                            />
                          </Stack>
                        ))}
                      </Stack>
                      {loading && (
                        <Box sx={{ width: '100%', mt: 3 }}>
                          <LinearProgress />
                        </Box>
                      )}
                      <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        sx={{ 
                          mt: { xs: 3, sm: 4 },
                          width: '100%'
                        }}
                      >
                        <Button 
                          variant="outlined" 
                          color="error" 
                          startIcon={<RestoreIcon fontSize={isMobile ? "small" : "medium"} />}
                          onClick={resetSemesterGrades}
                          sx={{
                            py: { xs: 1.2, sm: 1.5 },
                            borderRadius: { xs: 1.5, sm: 2 },
                            fontWeight: 500,
                            minHeight: { xs: '48px', sm: 'auto' }
                          }}
                        >
                          Reset Grades
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          startIcon={<CalculateIcon fontSize={isMobile ? "small" : "medium"} />}
                          onClick={calculateSGPA}
                          disabled={loading}
                          sx={{ 
                            py: { xs: 1.2, sm: 1.5 },
                            px: { xs: 3, sm: 4 },
                            borderRadius: { xs: 1.5, sm: 2 },
                            fontWeight: 600,
                            minHeight: { xs: '48px', sm: 'auto' },
                            boxShadow: 2
                          }}
                        >
                          Calculate SGPA
                        </Button>
                      </Stack>
                      {saveStatus && (
                        <Fade in={!!saveStatus}>
                          <Typography 
                            variant="body2" 
                            color="success.main" 
                            sx={{ mt: 2, textAlign: 'center' }}
                          >
                            {saveStatus}
                          </Typography>
                        </Fade>
                      )}
                    </Box>
                  </Box>
                  {sgpa > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Box 
                        sx={{ 
                          mb: { xs: 2, sm: 3 }, 
                          bgcolor: 'primary.main', 
                          color: 'primary.contrastText', 
                          borderRadius: { xs: 2, sm: 3 },
                          overflow: 'hidden',
                          position: 'relative',
                          p: { xs: 3, sm: 4 },
                          border: '1px solid',
                          borderColor: 'primary.dark',
                        }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                              <Typography 
                                variant="h6" 
                                gutterBottom
                                sx={{ 
                                  fontSize: { xs: '1rem', sm: '1.25rem' },
                                  opacity: 0.9
                                }}
                              >
                                {semesterSubjects[selectedSem].name} Result
                              </Typography>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'baseline',
                                  justifyContent: { xs: 'center', md: 'flex-start' }
                                }}
                              >
                                <Typography 
                                  variant="h3" 
                                  component="div" 
                                  sx={{ 
                                    fontWeight: 'bold',
                                    fontSize: { xs: '2.5rem', sm: '3rem' }
                                  }}
                                >
                                  {sgpa.toFixed(2)}
                                </Typography>
                                <Typography 
                                  variant="subtitle1" 
                                  sx={{ 
                                    ml: 1,
                                    opacity: 0.8
                                  }}
                                >
                                  SGPA
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LinearProgress 
                              variant="determinate" 
                              value={sgpa * 10} 
                              color="inherit"
                              sx={{ 
                                height: { xs: 12, sm: 15 }, 
                                borderRadius: 5, 
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: 'white'
                                }
                              }}
                            />
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                mt: 1,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                textAlign: { xs: 'center', md: 'left' }
                              }}
                            >
                              {sgpa >= 9 ? 'Outstanding Performance! 🎉' : 
                              sgpa >= 8 ? 'Excellent Work! 👏' : 
                              sgpa >= 7 ? 'Good Performance! 👍' : 
                              sgpa >= 6 ? 'Satisfactory Result' : 
                              'Room for improvement'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  )}
                </Stack>
              </motion.div>
            )}
          </div>
          
          {/* Tab Content: Overview */}
          <div role="tabpanel" hidden={currentTab !== 1}>
            {currentTab === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ mb: { xs: 2, sm: 3 }, borderRadius: { xs: 2, sm: 3 } }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'medium',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      Semester Overview
                    </Typography>
                    <Divider sx={{ mb: { xs: 2, sm: 3 } }} />
                    
                    <Grid container spacing={2}>
                      {semesterSubjects.map((sem, idx) => (
                        <Grid item xs={6} sm={6} md={3} key={sem.name}>
                          <Paper 
                            elevation={3}
                            sx={{ 
                              p: { xs: 1.5, sm: 2 }, 
                              borderRadius: { xs: 1.5, sm: 2 },
                              bgcolor: allSemesterGrades[idx] ? 'background.paper' : 'action.hover',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: 4
                              }
                            }}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mb: 1.5,
                              flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: sem.color,
                                  width: { xs: 36, sm: 40 },
                                  height: { xs: 36, sm: 40 },
                                  mb: { xs: 1, sm: 0 }
                                }}
                              >
                                {sem.id}
                              </Avatar>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  ml: { xs: 0, sm: 1 },
                                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                                  textAlign: { xs: 'center', sm: 'left' }
                                }}
                              >
                                {sem.name}
                              </Typography>
                            </Box>
                            
                            {allSemesterGrades[idx] ? (
                              <Box sx={{ 
                                mt: 'auto', 
                                textAlign: { xs: 'center', sm: 'left' } 
                              }}>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ 
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' } 
                                  }}
                                >
                                  SGPA
                                </Typography>
                                <Typography 
                                  variant="h4" 
                                  color="primary.main" 
                                  sx={{ 
                                    fontWeight: 'bold',
                                    fontSize: { xs: '1.75rem', sm: '2.25rem' }
                                  }}
                                >
                                  {allSemesterGrades[idx].sgpa.toFixed(2)}
                                </Typography>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={allSemesterGrades[idx].sgpa * 10} 
                                  color={
                                    allSemesterGrades[idx].sgpa >= 8 ? "success" : 
                                    allSemesterGrades[idx].sgpa >= 6 ? "primary" : 
                                    "error"
                                  }
                                  sx={{ 
                                    mt: 1, 
                                    mb: 1, 
                                    height: { xs: 4, sm: 6 }, 
                                    borderRadius: 3 
                                  }}
                                />
                              </Box>
                            ) : (
                              <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ 
                                    mb: 1,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                  }}
                                >
                                  No data available
                                </Typography>
                                <Button 
                                  variant="outlined" 
                                  size={isMobile ? "small" : "medium"}
                                  startIcon={<AddIcon fontSize="small" />}
                                  onClick={() => { setSelectedSem(idx); setCurrentTab(0); }}
                                  sx={{
                                    width: '100%',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    py: { xs: 0.5, sm: 1 }
                                  }}
                                >
                                  Add grades
                                </Button>
                              </Box>
                            )}
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    
                    {Object.keys(allSemesterGrades).length > 0 && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <Box 
                          sx={{ 
                            mt: { xs: 3, sm: 4 }, 
                            p: { xs: 3, sm: 4 }, 
                            bgcolor: 'background.paper', 
                            borderRadius: { xs: 2, sm: 3 }, 
                            border: '2px solid', 
                            borderColor: 'primary.main',
                            position: 'relative',
                          }}
                        >
                          <Box>
                            <Typography 
                              variant="h6" 
                              gutterBottom
                              sx={{ 
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                textAlign: { xs: 'center', sm: 'left' }
                              }}
                            >
                              CGPA Summary
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              paragraph
                              sx={{ 
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                textAlign: { xs: 'center', sm: 'left' },
                                mb: { xs: 2, sm: 2 }
                              }}
                            >
                              Based on {Object.keys(allSemesterGrades).length} completed semesters
                            </Typography>
                            
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={6}>
                                <Box 
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'baseline',
                                    justifyContent: { xs: 'center', sm: 'flex-start' }
                                  }}
                                >
                                  <Typography 
                                    variant="h3" 
                                    color="primary.main" 
                                    sx={{ 
                                      fontWeight: 'bold',
                                      fontSize: { xs: '2.5rem', sm: '3rem' }
                                    }}
                                  >
                                    {cgpa.toFixed(2)}
                                  </Typography>
                                  <Typography 
                                    variant="body1" 
                                    color="text.secondary" 
                                    sx={{ 
                                      ml: 1,
                                      fontSize: { xs: '0.9rem', sm: '1rem' }
                                    }}
                                  >
                                    / 10.00
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={cgpa * 10} 
                                    sx={{ 
                                      height: { xs: 8, sm: 10 }, 
                                      borderRadius: 5, 
                                      mb: 1 
                                    }}
                                    color={cgpa >= 8 ? "success" : cgpa >= 6 ? "primary" : "error"}
                                  />
                                  <Typography 
                                    variant="body2"
                                    sx={{ 
                                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                      textAlign: { xs: 'center', sm: 'left' }
                                    }}
                                  >
                                    {cgpa >= 9 ? 'Outstanding Performance' : 
                                    cgpa >= 8 ? 'Excellent Standing' : 
                                    cgpa >= 7 ? 'Good Standing' : 
                                    cgpa >= 6 ? 'Satisfactory' : 
                                    'Needs Improvement'}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </Container>
        
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={6000} 
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
