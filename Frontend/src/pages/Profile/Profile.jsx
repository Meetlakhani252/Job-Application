import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { User, Phone, MapPin, GraduationCap, Award, Link as LinkIcon } from 'lucide-react';
import Loader from '../../components/common/Loader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { supabase } from '../../supabaseClient.js';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
    portfolio_link: '',
    linkedin_url: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          // If profile record doesn't exist yet, populate with user signup metadata
          setFormData({
            full_name: user.user_metadata?.full_name || '',
            phone: user.user_metadata?.phone || '',
            address: '',
            education: '',
            skills: '',
            portfolio_link: '',
            linkedin_url: '',
          });
        } else if (data) {
          setFormData({
            full_name: data.full_name || user.user_metadata?.full_name || '',
            phone: data.phone || user.user_metadata?.phone || '',
            address: data.address || '',
            education: data.education || '',
            skills: Array.isArray(data.skills)
              ? data.skills.join(', ')
              : (data.skills || ''),
            portfolio_link: data.portfolio_link || '',
            linkedin_url: data.linkedin_url || '',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setFormData({
          full_name: user?.user_metadata?.full_name || '',
          phone: user?.user_metadata?.phone || '',
          address: '',
          education: '',
          skills: '',
          portfolio_link: '',
          linkedin_url: '',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  async function handleSave() {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          education: formData.education,
          skills: typeof formData.skills === 'string'
            ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
            : [],
          portfolio_link: formData.portfolio_link,
          linkedin_url: formData.linkedin_url,
          email: user.email,
        });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save profile.' });
    } finally {
      setSaving(false);
    }
  }

  if (!user) return <div className={styles.center}>Please login to view profile.</div>;
  if (loading) return <Loader />;

  return (
    <Box className={styles.pageWrapper}>
      <Container maxWidth="md" className={styles.container}>
        <Paper className={styles.profileCard} elevation={0}>
          <Box className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                {formData.full_name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className={styles.headerText}>
              <Typography variant="h4" className={styles.userName}>
                {formData.full_name || 'Your Name'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </div>
          </Box>

          <Divider className={styles.divider} />

          <Box className={styles.formSection}>
            <Typography variant="h6" className={styles.sectionTitle}>Personal Information</Typography>
            <div className={styles.grid}>
              <TextField
                label="Full Name"
                fullWidth
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                InputProps={{ startAdornment: <User size={18} className={styles.inputIcon} /> }}
              />
              <TextField
                label="Phone Number"
                fullWidth
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                InputProps={{ startAdornment: <Phone size={18} className={styles.inputIcon} /> }}
              />
              <TextField
                label="Address"
                fullWidth
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                InputProps={{ startAdornment: <MapPin size={18} className={styles.inputIcon} /> }}
              />
            </div>
          </Box>

          <Box className={styles.formSection}>
            <Typography variant="h6" className={styles.sectionTitle}>Professional Details</Typography>
            <div className={styles.grid}>
              <TextField
                label="Education Background"
                fullWidth
                multiline
                rows={3}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                InputProps={{ startAdornment: <GraduationCap size={18} className={styles.inputIcon} /> }}
              />
              <TextField
                label="Skills (comma separated)"
                fullWidth
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                InputProps={{ startAdornment: <Award size={18} className={styles.inputIcon} /> }}
              />
              <TextField
                label="Portfolio Link"
                fullWidth
                value={formData.portfolio_link}
                onChange={(e) => setFormData({ ...formData, portfolio_link: e.target.value })}
                InputProps={{ startAdornment: <LinkIcon size={18} className={styles.inputIcon} /> }}
              />
              <TextField
                label="LinkedIn URL"
                fullWidth
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                InputProps={{ startAdornment: <LinkIcon size={18} className={styles.inputIcon} /> }}
              />
            </div>
          </Box>

          {message.text && (
            <Alert severity={message.type === 'success' ? 'success' : 'error'} className={styles.alert}>
              {message.text}
            </Alert>
          )}

          <Box className={styles.actions}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={saving}
              className={styles.saveBtn}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
