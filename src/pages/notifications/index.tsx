import { Bell, MessageSquareDot, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import { Card } from "../../components/ui/card";
import Button from "../../components/ui/button/button";
import { NotificationCard } from "../../components/notification";
import { activityItems } from "../../data";
import type { StatCard } from "../../types";
import imgDashboardTracker from "../../assets/dashboardTracker.png";

const tags: HelmetProps = {
  pageTitle: "Notifications",
  description: "",
};

const stats: StatCard[] = [
  {
    label: "Total Notification",
    value: 6,
    icon: <Bell className="w-5 h-5" />,
    color: "text-primary-500",
    bgColor: "bg-purple-500",
  },
  {
    label: "Unread",
    value: 3,
    icon: <MessageSquareDot className="w-5 h-5" />,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    label: "High Priority",
    value: 2,
    icon: <Clock className="w-5 h-5" />,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    label: "Interview Reminders",
    value: 1,
    icon: <Calendar className="w-5 h-5" />,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const isResentActivity = true;
  return (
    <HelmetLayout {...tags}>
      <div className="">
      <div className="mb-6">
          <h1 className="text-xl sm:text-lg font-semibold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600 text-base">Stay updated on your job search progress</p>
        </div>
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-lg p-3 shadow-2xs border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </h3>
                    <div className={`${stat.color} ${stat.bgColor} p-1 rounded-full`}>{stat.icon}</div>
                  </div>
                  <p className="text-2xl sm:text-xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        <div>
          <Card hoverable={false} shadow="none">
            <p className="font-semibold text-[20px] mb-8">Recent Notifications</p>
            {isResentActivity ? (
              <div className="flex flex-col gap-5">
                {activityItems
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((activityItem) => (
                    <NotificationCard notification={activityItem} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pb-0 md:pb-[33px]">
                <img
                  src={imgDashboardTracker}
                  className="w-[80px] h-[80px] bg-red text-grey-100 md-0 mb-[20px]"
                  alt="Coach Me AI dashboard"
                />
                <p className="font-semibold text-2xl mb-2">
                  No recent activity
                </p>
                <p className="font-normal text-[16px] mb-8 text-grey-400">
                  Start applying to jobs to see your activity here
                </p>
                <Button className="p-4" onClick={() => navigate("/user/jobs")}>
                  Start Job Search
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </HelmetLayout>
  );
}
