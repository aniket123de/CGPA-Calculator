import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Paper,
  useTheme,
  Chip,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';
import { Semester } from '../types/types';
import Grid from './MuiGridFix';

interface GradeDistribution {
  gradeValue: string;
  count: number;
  color: string;
}

interface AnalyticsViewProps {
  semesters: { [key: number]: Semester };
  cgpa: number;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ semesters, cgpa }) => {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  // Calculate total courses and credits
  const totalCourses = Object.values(semesters).reduce(
    (sum, semester) => sum + semester.courses.length,
    0
  );
  
  const totalCredits = Object.values(semesters).reduce(
    (sum, semester) => sum + semester.courses.reduce((courseSum, course) => courseSum + (course.credits || 0), 0),
    0
  );

  // Calculate grade distribution
  const gradeDistribution: GradeDistribution[] = React.useMemo(() => {
    const gradeMap: { [key: string]: { count: number; color: string } } = {
      'A+': { count: 0, color: theme.palette.success.main },
      'A': { count: 0, color: theme.palette.success.light },
      'B+': { count: 0, color: theme.palette.info.main },
      'B': { count: 0, color: theme.palette.info.light },
      'C+': { count: 0, color: theme.palette.warning.light },
      'C': { count: 0, color: theme.palette.warning.main },
      'D': { count: 0, color: theme.palette.error.light },
      'F': { count: 0, color: theme.palette.error.main }
    };

    // Count occurrences of each grade
    Object.values(semesters).forEach(semester => {
      semester.courses.forEach(course => {
        if (course.grade && gradeMap[course.grade]) {
          gradeMap[course.grade].count += 1;
        }
      });
    });

    // Convert to array for rendering
    return Object.entries(gradeMap).map(([gradeValue, { count, color }]) => ({
      gradeValue,
      count,
      color
    }));
  }, [semesters, theme]);

  // Get CGPA color based on value
  const getCGPAColor = (cgpa: number): string => {
    if (cgpa >= 9) return theme.palette.success.main;
    if (cgpa >= 8) return theme.palette.success.light;
    if (cgpa >= 7) return theme.palette.info.main;
    if (cgpa >= 6) return theme.palette.info.light;
    if (cgpa >= 5) return theme.palette.warning.light;
    if (cgpa >= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Get performance trend - is CGPA improving over semesters?
  const getPerformanceTrend = (): { trend: 'improving' | 'declining' | 'stable'; text: string } => {
    const semesterSGPAs = Object.entries(semesters)
      .map(([index, sem]) => ({ index: Number(index), sgpa: sem.sgpa }))
      .sort((a, b) => a.index - b.index);

    if (semesterSGPAs.length <= 1) {
      return { trend: 'stable', text: 'Not enough data to determine trend' };
    }

    // Compare last two semesters
    const lastSemSGPA = semesterSGPAs[semesterSGPAs.length - 1].sgpa;
    const previousSemSGPA = semesterSGPAs[semesterSGPAs.length - 2].sgpa;

    if (lastSemSGPA > previousSemSGPA + 0.3) {
      return { trend: 'improving', text: 'Your performance is improving!' };
    } else if (lastSemSGPA < previousSemSGPA - 0.3) {
      return { trend: 'declining', text: 'Your performance is declining. Focus on improvement.' };
    } else {
      return { trend: 'stable', text: 'Your performance is stable.' };
    }
  };

  const performanceTrend = getPerformanceTrend();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%' }}
    >
      <Grid container spacing={3}>
        {/* CGPA Card */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cumulative GPA
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" component="div" sx={{ mr: 2, color: getCGPAColor(cgpa) }}>
                    {cgpa.toFixed(2)}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(cgpa * 10, 100)}
                      color={cgpa >= 7 ? "success" : cgpa >= 5 ? "warning" : "error"}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
                    <Chip 
                      label={`${Object.keys(semesters).length} Semesters`} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      label={`${totalCourses} Courses`} 
                      color="secondary" 
                      size="small" 
                    />
                    <Chip 
                      label={`${totalCredits} Credits`} 
                      color="info" 
                      size="small" 
                    />
                  </Stack>
                  <Typography 
                    variant="body2" 
                    align="center"
                    color={
                      performanceTrend.trend === 'improving' 
                        ? 'success.main' 
                        : performanceTrend.trend === 'declining' 
                          ? 'error.main' 
                          : 'text.secondary'
                    }
                  >
                    {performanceTrend.text}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Grade Distribution Card */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Grade Distribution
                </Typography>
                <List dense={isMobile}>
                  {gradeDistribution.map((grade) => (
                    <ListItem key={grade.gradeValue} disablePadding sx={{ mb: 1 }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: grade.color, fontWeight: 'bold' }}>
                            {grade.gradeValue}
                          </Typography>
                          <Typography variant="body2">
                            {grade.count} {grade.count === 1 ? 'course' : 'courses'}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(grade.count / totalCourses) * 100}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4, 
                            backgroundColor: theme.palette.background.paper,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: grade.color
                            }
                          }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Semester Progress Card */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Semester Progress
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  flexWrap: 'wrap', 
                  gap: 2, 
                  justifyContent: 'center' 
                }}>
                  {Object.entries(semesters)
                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                    .map(([semIndex, semester]) => (
                    <Paper 
                      key={semIndex} 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        minWidth: isMobile ? '100%' : 150,
                        flex: isMobile ? '1' : '0 0 auto',
                        borderLeft: `4px solid ${getCGPAColor(semester.sgpa)}`
                      }}
                    >
                      <Typography variant="subtitle1">
                        Semester {Number(semIndex) + 1}
                      </Typography>
                      <Typography variant="h5" sx={{ color: getCGPAColor(semester.sgpa) }}>
                        {semester.sgpa.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {semester.courses.length} courses
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(semester.sgpa * 10, 100)}
                        color={semester.sgpa >= 7 ? "success" : semester.sgpa >= 5 ? "warning" : "error"}
                        sx={{ height: 6, borderRadius: 3, mt: 1 }}
                      />
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default AnalyticsView;
