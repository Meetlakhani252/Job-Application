import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

// Card for a single opportunity in the listings grid
function OpportunityCard({ opportunity }) {
  const navigate = useNavigate();
  const { _id, title, companyName, type, domain, location } = opportunity;

  return (
    <Card sx={{ cursor: 'pointer', height: '100%' }}>
      <CardActionArea
        onClick={() => navigate(`/opportunities/${_id}`)}
        sx={{ height: '100%', alignItems: 'flex-start' }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {companyName}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={1} flexWrap="wrap">
            <Chip
              label={type}
              size="small"
              color={type === 'Job' ? 'primary' : 'secondary'}
              variant="filled"
            />
            <Typography variant="body2" color="text.secondary">
              {domain}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OpportunityCard;
