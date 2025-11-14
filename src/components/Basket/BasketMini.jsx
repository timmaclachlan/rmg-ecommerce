import { useState, useRef, useLayoutEffect } from 'react';
import { Badge, IconButton, Box, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBasket } from '../../hooks/useBasket';
import BasketPopup from './BasketPopup';

export default function BasketMini() {
  const { getCount } = useBasket();
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const hoverTimeout = useRef(null);

  // Measure the icon position for popup placement
  useLayoutEffect(() => {
    if (showPopup && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + 8,
        left: rect.right - 320,
      });
    }
  }, [showPopup]);

  // Helpers to delay closing (so user can move mouse from icon → popup)
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowPopup(false);
    }, 200);
  };

  return (
    <>
      {/* The basket icon */}
      <IconButton
        ref={iconRef}
        aria-label="shopping basket"
        sx={{ pr: 4, pt: 2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Badge badgeContent={getCount} color="error">
          <ShoppingCartIcon sx={{ color: '#ffffff' }} />
        </Badge>
      </IconButton>

      {/* The floating popup */}
      {showPopup && (
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: 'fixed', // <- key fix
            top: popupPos.top,
            left: popupPos.left,
            zIndex: 1500,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 2,
              width: 300,
              maxHeight: 400,
              overflowY: 'auto',
              borderRadius: 2,
              boxShadow: '0px 4px 25px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(4px)',
              bgcolor: 'background.paper',
            }}
          >
            <BasketPopup />
          </Paper>
        </Box>
      )}
    </>
  );
}
