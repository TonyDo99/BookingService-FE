import { Modal } from '@mui/material';
import { useState } from 'react';

export default function PopupModal({ status, setStatusRegister }) {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setStatusRegister(null);
    window.location.reload();
  }, 3000);
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div style={{ display: 'grid', placeItems: 'center', marginTop: '10%' }}>
        {status ? (
          <video
            style={{
              borderRadius: '100%',
            }}
            loading="lazy"
            muted
            src="https://cdnl.iconscout.com/lottie/premium/thumb/success-mark-3767443-3162439.mp4"
            type="video/mp4"
            autoPlay="autoplay"
            loop="loop"
          />
        ) : (
          <video
            loading="lazy"
            style={{
              borderRadius: '100%',
            }}
            muted
            src="https://cdnl.iconscout.com/lottie/premium/thumb/process-fail-4958984-4123549.mp4"
            type="video/mp4"
            autoPlay="autoplay"
            loop="loop"
          />
        )}
      </div>
    </Modal>
  );
}
