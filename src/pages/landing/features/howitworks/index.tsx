import React from 'react';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Smartphone, Search, LineChart } from 'lucide-react';
import ArrowConnector from '../../../../assets/Arrow 6.png';
import MobileConnectorImg from '../../../../assets/Arrow 6 (1).png';

interface WorkStep {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
}

const workSteps: WorkStep[] = [
    {
        id: 1,
        icon: Smartphone,
        title: 'Sign Up & Create Your Profile',
        description:
            'Set up your account, upload your resume, and personalize your job preferences.',
    },
    {
        id: 2,
        icon: Search,
        title: 'Automated Job Application',
        description:
            'Leverage AI-powered automation to find jobs and apply with good cover letters.',
    },
    {
        id: 3,
        icon: LineChart,
        title: 'Track & Optimize Your Applications',
        description: 'Track applications and boost success with real-time insights.',
    },
];

// --- Step Card ---
const WorkStepCard: React.FC<{ step: WorkStep }> = ({ step }) => {
    const Icon = step.icon;
    return (
        <Card className="p-6 flex flex-col h-full border border-gray-100 shadow-none text-left">
            <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 mr-3 text-primary-500 flex-shrink-0" />
                <h3 className="text-sm sm:text-sm font-semibold text-grey-500">
                    {step.title}
                </h3>
            </div>
            <p className="text-grey-300 leading-relaxed text-base sm:text-base">
                {step.description}
            </p>
        </Card>
    );
};

// --- Connectors ---
const DesktopConnector: React.FC = () => (
    <div className="hidden md:flex items-center justify-center h-full">
        <img
            src={ArrowConnector}
            alt="Desktop connector arrow"
            className="w-20 md:w-20 lg:w-26 object-contain mx-auto"
        />
    </div>
);

const MobileConnector: React.FC = () => (
    <div className="flex md:hidden items-center justify-center w-full my-4">
        <img
            src={MobileConnectorImg}
            alt="Mobile connector arrow"
            className="w-30 sm:w-40  object-contain mx-auto"
        />
    </div>
);

// --- Main Component ---
const HowItWorks: React.FC = () => {
    return (
        <section id='how-it-works' className="bg-white py-10 sm:py-10 lg:py-10 h-auto">
            <div className="max-w-7xl px-8 sm:px-20 lg:px-20">
                {/* Header */}
                <div className="text-center mb-4 sm:mb-8">
                    <Badge className="mb-4 sm:mb-6 bg-transparent border border-primary-500 text-primary-500">
                        How It Works
                    </Badge>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-grey-500">
                        Simple to Setup. Powerful in Action
                    </h2>
                </div>

                {/* Steps + Arrows */}
                {/* --- Desktop layout--- */}
                <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-0">
                    <WorkStepCard step={workSteps[0]} />
                    <DesktopConnector />
                    <WorkStepCard step={workSteps[1]} />
                    <DesktopConnector />
                    <WorkStepCard step={workSteps[2]} />
                </div>

                {/* --- Mobile layout --- */}
                <div className="flex flex-col items-center md:hidden">
                    {workSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="w-full max-w-sm">
                                <WorkStepCard step={step} />
                            </div>
                            {index < workSteps.length - 1 && <MobileConnector />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
