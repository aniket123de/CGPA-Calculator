import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
  LinearProgress,
  useTheme,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import {
  FileDownload as DownloadIcon,
  FileUpload as UploadIcon,
  ContentCopy as CopyIcon,
  DeleteSweep as ClearIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';
import Grid from './MuiGridFix';

interface SavedGradesData {
  [key: number]: { grades: string[], sgpa: number };
}

interface DataManagementProps {
  savedData: SavedGradesData;
  importData: (data: SavedGradesData) => void;
  clearAllData: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({
  savedData,
  importData,
  clearAllData
}) => {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'info'
  });
  
  const exportData = () => {
    try {
      const dataStr = JSON.stringify(savedData, null, 2);
      setExportText(dataStr);
      setExportDialogOpen(true);
    } catch (error) {
      showSnackbar('Failed to export data!', 'error');
    }
  };
  
  const [exportText, setExportText] = useState('');
  
  const handleImport = () => {
    try {
      if (!importText.trim()) {
        showSnackbar('Please enter the data to import', 'warning');
        return;
      }
      
      const parsedData = JSON.parse(importText) as SavedGradesData;
      importData(parsedData);
      setImportDialogOpen(false);
      showSnackbar('Data imported successfully!', 'success');
    } catch (error) {
      showSnackbar('Invalid data format!', 'error');
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportText);
    showSnackbar('Copied to clipboard!', 'info');
  };
  
  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  const handleClearData = () => {
    clearAllData();
    setClearDialogOpen(false);
    showSnackbar('All data cleared!', 'info');
  };
  
  const handleDownloadFile = () => {
    const dataStr = JSON.stringify(savedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'cgpa-calculator-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setExportDialogOpen(false);
    showSnackbar('File downloaded!', 'success');
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content) as SavedGradesData;
        importData(parsedData);
        showSnackbar('Data imported from file successfully!', 'success');
      } catch (err) {
        showSnackbar('Error importing file: Invalid format', 'error');
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Check if data exists
  const hasData = Object.keys(savedData).length > 0;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%' }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Data Management
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                  <Paper 
                    elevation={2} 
                    sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Export Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                      Save your CGPA data to a file or copy as text
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={exportData}
                        disabled={!hasData}
                      >
                        Export
                      </Button>
                    </Box>
                  </Paper>

                  <Paper 
                    elevation={2} 
                    sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Import Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                      Import from text data or upload a file
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<UploadIcon />}
                        onClick={() => setImportDialogOpen(true)}
                      >
                        Import Text
                      </Button>

                      <Button
                        variant="outlined"
                        color="secondary"
                        component="label"
                      >
                        Upload File
                        <input
                          hidden
                          accept=".json"
                          type="file"
                          onChange={handleFileUpload}
                        />
                      </Button>
                    </Box>
                  </Paper>

                  <Paper 
                    elevation={2} 
                    sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Reset Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                      Clear all saved semester data
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ClearIcon />}
                      onClick={() => setClearDialogOpen(true)}
                      disabled={!hasData}
                    >
                      Clear All Data
                    </Button>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Import Dialog */}
      <Dialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Import CGPA Data</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Paste your previously exported CGPA calculator data below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="import-data"
            label="JSON Data"
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleImport} variant="contained" color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Dialog */}
      <Dialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Export CGPA Data
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopyToClipboard}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Your CGPA data is shown below. Copy this text or download it as a file for backup or transfer.
          </DialogContentText>
          <TextField
            margin="dense"
            id="export-data"
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={exportText}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Close</Button>
          <Button 
            onClick={handleDownloadFile} 
            variant="contained" 
            color="primary"
            startIcon={<DownloadIcon />}
          >
            Download as File
          </Button>
        </DialogActions>
      </Dialog>

      {/* Clear Data Confirmation Dialog */}
      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
      >
        <DialogTitle>Clear All Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all saved semester data? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearData} variant="contained" color="error">
            Clear All Data
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default DataManagement;
