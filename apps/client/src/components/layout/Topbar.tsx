'use client';

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
    onCreateClick: () => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    }

export default function Topbar({ onCreateClick, onCategoryChange, onSortChange, onSearchChange  }: Props) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#fff',
      }}
    >
      <Toolbar
        sx={{ justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          EventFlow
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          flex={1}
        >
          <Select
            defaultValue="all"
            size="small"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="arts">Arts</MenuItem>
          </Select>

          <Select
            defaultValue="newest"
            size="small"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="newest">Date: Newest</MenuItem>
            <MenuItem value="oldest">Date: Oldest</MenuItem>
          </Select>

          <Paper
            sx={{
              p: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              width: 250,
            }}
            variant="outlined"
          >
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search events..."
              inputProps={{ 'aria-label': 'search events' }}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Paper>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
            onClick={onCreateClick}
          >
            Create Event
          </Button>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
