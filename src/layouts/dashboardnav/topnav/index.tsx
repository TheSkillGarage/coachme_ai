import { CircleQuestionMark, LogOut, Menu, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems, helperMenuItems } from '../sidnav/menu';
import { CustomDropdown } from '../../../components/ui/dropdown';
import LogoutDialog from '../../../components/auth/logout';
import { useState } from 'react';
import { UserAvatar } from '../../../components/useravatar';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

interface User {
  name: string;
  avatar?: string | null;
  email: string;
}

interface MenuItem {
  title: string;
  pathname?: string;
  subMenu?: MenuItem[];
}

// Helper to recursively find the current route title
const findRouteTitle = (items: MenuItem[], pathname: string): string | null => {
  for (const item of items) {
    // Exact match
    if (item.pathname === pathname) return item.title;
    // Partial match - check if current pathname starts with item's pathname
    if (item.pathname && pathname.startsWith(item.pathname + '/')) {
      return item.title;
    }
    // Check submenus recursively
    if (item.subMenu) {
      const subResult = findRouteTitle(item.subMenu, pathname);
      if (subResult) return subResult;
    }
  }
  return null;
};

export default function Main({ setSidebarOpen }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Example user data
  const user: User = {
    name: 'Innocent Etah',
    avatar: null,
    email: 'test@test.com',
  };

  // Get matching title from menuItems or fallback
  const currentTitle =
    findRouteTitle(menuItems, location.pathname) ||
    findRouteTitle(helperMenuItems, location.pathname) ||
    'Dashboard';

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic title from route */}
        <h1 className="font-semibold text-base text-gray-800">
          {currentTitle}
        </h1>
      </div>
      <div>
        <CustomDropdown
          open={open}
          setOpen={setOpen}
          trigger={
            <div>
              <UserAvatar user={user} />
            </div>
          }
          width="w-[320px]"
          align="right"
        >
          <div className="p-4">
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <UserAvatar user={user} />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-[#888888]">{user.email}</p>
                </div>
              </div>
              <hr className="mb-6 border-grey-50" />
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/user/profile');
                }}
                className="flex items-center gap-2 w-full text-left text-grey-500 hover:bg-gray-100 rounded-md px-3 py-3 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <p>View Profile</p>
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/user/settings');
                }}
                className="flex items-center gap-2 w-full text-left text-grey-500 hover:bg-gray-100 rounded-md px-3 py-3 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <p>Settings</p>
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/user/help');
                }}
                className="flex items-center gap-2 w-full text-left text-grey-500 hover:bg-gray-100 rounded-md px-3 py-3 cursor-pointer"
              >
                <CircleQuestionMark className="w-4 h-4" />
                <p>Help & Support</p>
              </button>
              <hr className="mb-2 border-grey-50" />
              <button
                onClick={() => {
                  setOpen(false);
                  setIsLogoutOpen(true);
                }}
                className="
                    flex items-center gap-2
                    rounded-md px-3 py-3 w-full
                    font-normal text-sm text-[#FF1D00]
                    hover:cursor-pointer hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 " />
                <p>Log Out</p>
              </button>
            </div>
          </div>
        </CustomDropdown>
      </div>
      <LogoutDialog
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        clickOverlayToClose={false}
      />
    </header>
  );
}
