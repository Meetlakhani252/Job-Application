const { Router } = require('express');
const multer = require('multer');
const { submitApplication, getApplication, listMyApplications } = require('../controllers/applicationController');
const requireUser = require('../middleware/requireUser');
const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const router = Router();

// In-memory upload buffer (max 5MB, PDF only)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new AppError('Only PDF files are allowed', 400), false);
    }
  },
});

// Secure resume upload endpoint (uses backend service role to bypass storage RLS)
router.post('/upload-resume', requireUser, upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No resume file provided', 400);
    }

    const fileExt = req.file.originalname.split('.').pop() || 'pdf';
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw new AppError(uploadError.message || 'Failed to upload resume to storage', 500);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    sendSuccess(res, { publicUrl }, 'Resume uploaded successfully');
  } catch (err) {
    next(err);
  }
});

// Only authenticated users can submit applications or track them
router.post('/', requireUser, submitApplication);
router.get('/my', requireUser, listMyApplications);
router.get('/:applicationId', requireUser, getApplication);

module.exports = router;
