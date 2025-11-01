import { Avatar } from '../ui/avatar';
import { useToast } from "../../components/uiToast/ToastProvider";

interface UserAvatarProps {
  user: { name: string; avatar?: string | null };
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  // Helper to get initials from full name
  const { showToast } = useToast();
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      {user.avatar ? (
        <div>
          <Avatar
            src={user.avatar}
            name={user.name}
            size="md"
            onClick={() => showToast('Avatar clicked!')}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500 text-white font-medium border border-gray-200">
          {getInitials(user.name)}
        </div>
      )}
    </div>
  );
};
