import { Briefcase, FileText, FileUser, ChartLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import imgDashboardTracker from '../../assets/dashboardTracker.png';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import { Card } from '../../components/ui/card';
import { TopCard } from '../../components/topcard';
import Button from '../../components/ui/button/button';
import { SwitchAI } from '../../components/switchai';
import { NotificationCard } from '../../components/notification';
import { activityItems } from '../../data';

const tags: HelmetProps = {
    pageTitle: 'User Dashboard',
    description: '',
};

export default function Main() {
    const navigate = useNavigate();
    const isResentActivity = true; // temporal variable for changing view

    return (
        <HelmetLayout {...tags}>
            <div className="">
                <p className="mb-2 font-semibold text-2xl">Welcome to CoachMe AI</p>
                <p className="mb-6 font-normal text-[16px]">
                    Your AI-powered job search companion. Let's find your perfect
                    opportunity.
                </p>

                <SwitchAI />

        <div className="flex justify-between flex-col xl:flex-row gap-2 mb-8">
          <TopCard
            title="Find Jobs"
            description="Search thousands of job listings"
            icon={<Briefcase className="w-4 h-4 text-primary-500" />}
            iconBg="bg-purple-500"
            onActionClick={() => navigate('/user/jobs')}
            cardProps={{
              shadow: 'none',
              hoverable: false,
            }}
          />
          <TopCard
            title="Track Applications"
            description="Manage your job applications"
            icon={<FileText className="w-4 h-4 bg-red text-[#2563EB]" />}
            iconBg="bg-[#DBEAFE]"
            onActionClick={() => navigate('/user/applications')}
            cardProps={{
              shadow: 'none',
              hoverable: false,
            }}
          />
          <TopCard
            title="View Analytics"
            description="Track your job search progress"
            icon={<ChartLine className="w-4 h-4 text-[#166534]" />}
            iconBg="bg-[#F0FDF4]"
            onActionClick={() => navigate('/user/analytics')}
            cardProps={{
              shadow: 'none',
              hoverable: false,
            }}
          />
          <TopCard
            title="Update Resume"
            description="Keep your resume current"
            icon={<FileUser className="w-4 h-4 text-[#EA580C]" />}
            iconBg="bg-[#FFF2E1]"
            onActionClick={() => navigate('/user/resume')}
            cardProps={{
              shadow: 'none',
              hoverable: false,
            }}
          />
        </div>

        <div>
          <Card hoverable={false} shadow="none">
            <p className="font-semibold text-[20px] mb-8">Recent Activity</p>
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
                <Button
                  className="p-4"
                  onClick={() => navigate('/user/jobs')}
                >
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
