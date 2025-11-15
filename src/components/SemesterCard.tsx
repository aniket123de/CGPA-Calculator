import React, { useState } from 'react';
import { Course, Semester } from '../types/types';
import { 
  Card, CardContent, CardHeader, Typography, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Select, 
  MenuItem, IconButton, Button, Box, Chip, 
  FormControl, InputLabel, LinearProgress, Avatar,
  Collapse, useTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Calculate as CalculateIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';
import Grid from './MuiGridFix';
import type { SelectChangeEvent } from '@mui/material/Select';

interface SemesterCardProps {
  semester: Semester;
  semesterIndex: number;
  updateCourse: (semesterIndex: number, courseIndex: number, field: keyof Course, value: string | number) => void;
  addCourse: (semesterIndex: number) => void;
  removeCourse: (semesterIndex: number, courseIndex: number) => void;
  calculateSGPA: (semesterIndex: number) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ 
  semester, 
  semesterIndex, 
  updateCourse, 
  addCourse, 
  removeCourse,
  calculateSGPA
}) => {
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [expanded, setExpanded] = useState<boolean>(true);
  
  // Define grade options with colors
  const gradeOptions = [
    { value: 'A+', label: 'A+ (10)', color: theme.palette.success.main },
    { value: 'A', label: 'A (9)', color: theme.palette.success.light },
    { value: 'B+', label: 'B+ (8)', color: theme.palette.info.main },
    { value: 'B', label: 'B (7)', color: theme.palette.info.light },
    { value: 'C+', label: 'C+ (6)', color: theme.palette.warning.light },
    { value: 'C', label: 'C (5)', color: theme.palette.warning.main },
    { value: 'D', label: 'D (4)', color: theme.palette.error.light },
    { value: 'F', label: 'F (0)', color: theme.palette.error.main }
  ];
  
  // Function to get color based on SGPA
  const getSGPAColor = (sgpa: number): string => {
    if (sgpa >= 9) return theme.palette.success.main;
    if (sgpa >= 8) return theme.palette.success.light;
    if (sgpa >= 7) return theme.palette.info.main;
    if (sgpa >= 6) return theme.palette.info.light;
    if (sgpa >= 5) return theme.palette.warning.light;
    if (sgpa >= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  // Progress indicator for SGPA (0-10 scale)
  const sgpaProgress = Math.min(semester.sgpa * 10, 100);
  
  // Animation variants for motion components
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: semesterIndex * 0.1,
        duration: 0.5 
      } 
    }
  };
  
  const handleGradeChange = (courseIndex: number, event: SelectChangeEvent) => {
    updateCourse(semesterIndex, courseIndex, 'grade', event.target.value);
  };

  const handleCreditsChange = (courseIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      updateCourse(semesterIndex, courseIndex, 'credits', value);
    }
  };

  const handleNameChange = (courseIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    updateCourse(semesterIndex, courseIndex, 'name', event.target.value);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card 
        elevation={3} 
        sx={{ 
          mb: 3,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: getSGPAColor(semester.sgpa) }}>
              <SchoolIcon />
            </Avatar>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Semester {semesterIndex + 1}
              </Typography>
              <Chip
                label={`SGPA: ${semester.sgpa.toFixed(2)}`}
                color={semester.sgpa >= 7 ? "success" : semester.sgpa >= 5 ? "warning" : "error"}
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          }
          action={
            <IconButton 
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="toggle expand"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          }
        />
        
        {/* Progress bar for SGPA visualization */}
        <LinearProgress 
          variant="determinate" 
          value={sgpaProgress} 
          color={semester.sgpa >= 7 ? "success" : semester.sgpa >= 5 ? "warning" : "error"}
          sx={{ height: 8, mx: 2 }}
        />
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box sx={{ overflowX: 'auto' }}>
              <Grid container spacing={2}>
                {semester.courses.map((course, courseIndex) => (
                  <Grid item xs={12} key={courseIndex}>
                    <Paper sx={{ p: 2, borderRadius: 2, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                      <Typography variant="body1" gutterBottom sx={{ fontWeight: 'medium', mb: 1, minHeight: 24 }}>
                        {course.name || `Course ${courseIndex + 1}`}
                      </Typography>
                      <Chip
                        label={`${course.credits || 0} credits`}
                        size={isMobile ? 'small' : 'medium'}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1, alignSelf: 'flex-start', minHeight: 28 }}
                      />
                      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1, alignItems: isMobile ? 'stretch' : 'center', width: '100%' }}>
                        <FormControl fullWidth size="small" sx={{ mb: isMobile ? 1 : 0, minHeight: 40 }}>
                          <Select
                            value={course.grade}
                            onChange={e => handleGradeChange(courseIndex, e)}
                            displayEmpty
                          >
                            <MenuItem value=""><em>Grade</em></MenuItem>
                            {gradeOptions.map(option => (
                              <MenuItem key={option.value} value={option.value} sx={{ color: option.color }}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={course.credits || ''}
                          onChange={e => handleCreditsChange(courseIndex, e as React.ChangeEvent<HTMLInputElement>)}
                          placeholder="Credits"
                          inputProps={{ min: 0, max: 10, style: { textAlign: 'center' } }}
                          sx={{ minHeight: 40 }}
                        />
                      </Box>
                      <IconButton color="error" onClick={() => removeCourse(semesterIndex, courseIndex)} size={isMobile ? 'small' : 'medium'} sx={{ alignSelf: 'flex-end', mt: 1 }}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => addCourse(semesterIndex)}
                  size={isMobile ? "small" : "medium"}
                  fullWidth={isMobile}
                >
                  Add Course
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CalculateIcon />}
                  onClick={() => calculateSGPA(semesterIndex)}
                  size={isMobile ? "small" : "medium"}
                  fullWidth={isMobile}
                >
                  Calculate SGPA
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </motion.div>
  );
};

export default SemesterCard;
