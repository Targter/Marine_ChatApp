import { Crown } from 'lucide-react';
import { useStore } from '../store/useStore';

export function PremiumBanner() {
  const { user, setUser } = useStore();

  if (user.isPremium) return null;

  const handleUpgrade = () => {
    // Simulate payment process
    if (confirm('Upgrade to Premium for $9.99/month?')) {
      setUser({ ...user, isPremium: true });
    }
  };

  return (
    <div className="fixed top-3 center-0">
      <button
        onClick={handleUpgrade}
        className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
      >
        <Crown className="h-5 w-5" />
        <span>Upgrade to Premium</span>
      </button>
    </div>
  );
}