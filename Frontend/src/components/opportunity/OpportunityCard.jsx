import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styles from './OpportunityCard.module.css';

// Card for a single opportunity in the listings grid
function OpportunityCard({ opportunity }) {
  const navigate = useNavigate();
  const { _id, title, companyName, type, domain, location } = opportunity;

  return (
    <Card className={styles.card}>
      <CardActionArea
        onClick={() => navigate(`/opportunities/${_id}`)}
        className={styles.actionArea}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {companyName}
          </Typography>
          <div className={styles.meta}>
            <Chip
              label={type}
              size="small"
              color={type === 'Job' ? 'primary' : 'secondary'}
              variant="filled"
            />
            <Typography variant="body2" color="text.secondary">
              {domain}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary" className={styles.location}>
            {location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OpportunityCard;
