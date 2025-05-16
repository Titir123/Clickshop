export default function handler(req, res) {
    // Simulate network delay
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
  
      if (success) {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(500).json({ status: 'failure', message: 'Payment failed. Please try again.' });
      }
    }, 2000); // simulate 2s delay
  }
  