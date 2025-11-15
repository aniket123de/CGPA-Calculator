import React, { useState } from 'react';
import { Course, Semester } from '../types/types';
import { 
  Card, CardContent, CardHeader, Typography, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Select, 
  MenuItem, IconButton, Button, Box, Chip, 
  FormControl, InputLabel, LinearProgress, Avatar,
  Collapse, useTheme, Stack
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
        elevation={2} 
        sx={{ 
          mb: 3,
          borderRadius: { xs: 2, sm: 3 },
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 3,
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                bgcolor: getSGPAColor(semester.sgpa),
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 }
              }}
            >
              <SchoolIcon fontSize={isMobile ? 'small' : 'medium'} />
            </Avatar>
          }
          title={
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                Semester {semesterIndex + 1}
              </Typography>
              <Chip
                label={`SGPA: ${semester.sgpa.toFixed(2)}`}
                color={semester.sgpa >= 7 ? "success" : semester.sgpa >= 5 ? "warning" : "error"}
                size={isMobile ? 'small' : 'medium'}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          }
          action={
            <IconButton 
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="toggle expand"
              size={isMobile ? 'small' : 'medium'}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          }
          sx={{ 
            pb: 1,
            px: { xs: 2, sm: 3 }
          }}
        />
        
        {/* Progress bar for SGPA visualization */}
        <LinearProgress 
          variant="determinate" 
          value={sgpaProgress} 
          color={semester.sgpa >= 7 ? "success" : semester.sgpa >= 5 ? "warning" : "error"}
          sx={{ 
            height: { xs: 6, sm: 8 },
            mx: { xs: 2, sm: 3 }
          }}
        />
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 3 }}>
            <Box>
              <Grid container spacing={2}>
                {semester.courses.map((course, courseIndex) => (
                  <Grid item xs={12} key={courseIndex}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: { xs: 2, sm: 2.5 }, 
                        borderRadius: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.default',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            fullWidth
                            variant="standard"
                            value={course.name}
                            onChange={e => handleNameChange(courseIndex, e as React.ChangeEvent<HTMLInputElement>)}
                            placeholder="Course name"
                            sx={{ 
                              mb: 1.5,
                              '& .MuiInput-root': {
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                fontWeight: 500
                              }
                            }}
                          />
                          <Chip
                            label={`${course.credits || 0} credits`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                          />
                        </Box>
                        <IconButton 
                          color="error" 
                          onClick={() => removeCourse(semesterIndex, courseIndex)} 
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size={isMobile ? 'medium' : 'small'}>
                            <InputLabel>Grade</InputLabel>
                            <Select
                              value={course.grade}
                              label="Grade"
                              onChange={e => handleGradeChange(courseIndex, e)}
                            >
                              {gradeOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box 
                                      sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        bgcolor: option.color 
                                      }} 
                                    />
                                    {option.label}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size={isMobile ? 'medium' : 'small'}
                            type="number"
                            label="Credits"
                            value={course.credits || ''}
                            onChange={e => handleCreditsChange(courseIndex, e as React.ChangeEvent<HTMLInputElement>)}
                            inputProps={{ min: 0, max: 10, style: { textAlign: 'center' } }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="space-between"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addCourse(semesterIndex)}
                fullWidth={isMobile}
                sx={{ 
                  py: 1.5,
                  minHeight: { xs: 48, sm: 'auto' }
                }}
              >
                Add Course
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CalculateIcon />}
                onClick={() => calculateSGPA(semesterIndex)}
                fullWidth={isMobile}
                sx={{ 
                  py: 1.5,
                  minHeight: { xs: 48, sm: 'auto' }
                }}
              >
                Calculate SGPA
              </Button>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </motion.div>
  );
};

export default SemesterCard;
