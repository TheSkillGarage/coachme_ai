import React from "react";
import { Briefcase, FileText, PenTool, ChartLine } from "lucide-react";
import imgJobSearch from "../../../assets/features1.png";
import imgResume from "../../../assets/features2.png";
import imgCoverLetter from "../../../assets/features3.png";
import imgAnalytics from "../../../assets/features4.png";
import { Badge } from "../../../components/ui/badge";

interface Feature {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    icon: React.ElementType;
    iconColor: string;
}

const features: Feature[] = [
    {
        id: 1,
        title: "Automated Job Application",
        description:
            "Automate your job hunt with AI-powered tools that match your skills, experience, and goals to the right opportunities faster.",
        imageSrc: imgJobSearch,
        icon: Briefcase,
        iconColor: "text-[#FA8E89]",
    },
    {
        id: 2,
        title: "Smart Resume Builder",
        description:
            "Create optimized, professional resumes in seconds, designed to grab recruiters' attention and increase your chances of landing interviews.",
        imageSrc: imgResume,
        icon: FileText,
        iconColor: "text-[#94BDF8]",
    },
    {
        id: 3,
        title: "Cover Letter Generator",
        description:
            "Craft personalized cover letters recruiters can't ignore, tailored to every role and designed to make your applications stand out.",
        imageSrc: imgCoverLetter,
        icon: PenTool,
        iconColor: "text-[#82F5A6]",
    },
    {
        id: 4,
        title: "Application Analytics",
        description:
            "Track your applications, measure success, and gain actionable insights to improve your chances of landing interviews faster.",
        imageSrc: imgAnalytics,
        icon: ChartLine,
        iconColor: "text-primary-500",
    },
];

const FeatureBlock: React.FC<{ feature: Feature; isReversed: boolean }> = ({
    feature,
    isReversed,
}) => {
    const directionClasses = isReversed ? "lg:flex-row-reverse" : "lg:flex-row";
    const textAlignmentClasses = isReversed
        ? "lg:text-right lg:pl-10"
        : "lg:text-left lg:pr-10";
    const Icon = feature.icon;

    return (
        <div
            className={`flex flex-col ${directionClasses} items-center gap-8 sm:gap-10 lg:gap-12`}
        >
            {/* Text Section */}
            <div
                className={`w-full lg:w-1/2 px-4 sm:px-6 lg:px-0 ${textAlignmentClasses}`}
            >
                <div
                    className={`flex items-center mb-4 ${isReversed ? "justify-start" : "justify-start"
                        }`}
                >
                    <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center`}
                    >
                        <Icon className={`${feature.iconColor}`} size={24} />
                    </div>
                    <h3
                        className="ml-3 sm:ml-4 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-grey-500 text-left leading-snug"
                        style={{ lineHeight: "1.3" }}
                    >
                        {feature.title}
                    </h3>


                </div>
                <p
                    className="text-[20px] text-grey-500 leading-snug text-left"
                    style={{ lineHeight: "1.5" }}
                >
                    {feature.description}
                </p>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-0">
                <div className="rounded-xl overflow-hidden">
                    <img
                        src={feature.imageSrc}
                        alt={`Screenshot of the ${feature.title}`}
                        className="w-full h-auto object-contain sm:object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14 lg:mb-16 px-4 sm:px-0">
                    <Badge className="text-primary-500 border border-primary-500 bg-white mb-2">
                        Features
                    </Badge>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-grey-500">
                        Everything You Need to Land Your Dream Job
                    </h2>
                </div>

                {/* Feature Blocks */}
                <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20">
                    {features.map((feature, index) => (
                        <FeatureBlock
                            key={feature.id}
                            feature={feature}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
