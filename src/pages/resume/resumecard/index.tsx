import { MoreVertical, Upload } from 'lucide-react';
import Button from '../../../components/ui/button/button';
import { Card } from '../../../components/ui/card';

interface ResumeCard {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linedIn: string;
  location: string;
  summary: string;
  fileName: string;
  createdAt: string;
  isDefault?: boolean;
}

interface IntroProps {
  onStart?: () => void;
}

export default function Resumes({ onStart }: IntroProps) {
  const resumes: ResumeCard[] = [
    {
      id: 1,
      firstName: 'BLESSSING',
      lastName: 'BELLA',
      location: 'Nigeria',
      email: 'blessingbella@gmail.com',
      linedIn: 'linkedin.com/in/blessingbella',
      summary:
        'Detail-oriented software engineer with 5+ years of experience developing scalable web applications',
      fileName: 'Blessing Resume',
      createdAt: '18/5/25',
      isDefault: true,
    },
    {
      id: 2,
      firstName: 'BLESSSING',
      lastName: 'BELLA',
      location: 'Nigeria',
      email: 'blessingbella@gmail.com',
      linedIn: 'linkedin.com/in/blessingbella',
      summary:
        'Detail-oriented software engineer with 5+ years of experience developing scalable web applications. Detail-oriented software engineer with 5+ years of experience developing scalable web applications',
      fileName: 'Blessing Resume',
      createdAt: '18/5/25',
    },
    {
      id: 3,
      firstName: 'BLESSSING',
      lastName: 'BELLA',
      location: 'Nigeria',
      email: 'blessingbella@gmail.com',
      linedIn: 'linkedin.com/in/blessingbella',
      summary:
        'Detail-oriented software engineer with 5+ years of experience developing scalable web applications',
      fileName: 'Blessing Resume',
      createdAt: '18/5/25',
    },
    {
      id: 4,
      firstName: 'BLESSSING',
      lastName: 'BELLA',
      location: 'Nigeria',
      email: 'blessingbella@gmail.com',
      linedIn: 'linkedin.com/in/blessingbella',
      summary:
        'Detail-oriented software engineer with 5+ years of experience developing scalable web applications',
      fileName: 'Blessing Resume',
      createdAt: '18/5/25',
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div
        className="
          flex flex-col
          justify-between items-start mb-8
          sm:flex-row sm:items-center
        "
      >
        <div>
          <h1 className="text-2xl font-semibold text-grey-500 mb-2">
            Your Resume’s
          </h1>
          <p className="text-[16px] text-grey-300 mb-8 md:mb-0">
            Manage and organize your saved resumes
          </p>
        </div>
        <Button
          icon={<Upload className="w-4 h-4" />}
          iconPosition="left"
          onClick={onStart}
          className="
            flex
            w-full
            text-white
            bg-[#67005E]
            rounded-lg
            hover:bg-[#52004A] items-center gap-2 py-4 px-2
            sm:mt-0
            md:w-[213px]
          "
        >
          Upload New Resume
        </Button>
      </div>

      {/* ===== Resume Cards ===== */}
      <div
        className="
          flex flex-wrap
          w-full
          justify-center gap-6
          sm:justify-start
          md:gap-7
        "
      >
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            className="
              flex flex-col
              w-full
              p-0
              bg-transparent
              rounded-2xl border border-gray-200
              shadow-sm transition-all
              justify-between hover:shadow-md duration-200
              sm:w-[47%]
              xl:w-[251px]
            "
          >
            {/* Top Content */}
            <div
              className="
                p-3 space-y-2
                bg-[#f7f7f7]
                rounded-t-2xl border-b border-[#E8E8E8]
              "
            >
              <h2 className="font-semibold text-[16px] leading-snug">
                {resume.firstName} {resume.lastName}
              </h2>
              <p className="text-xs text-gray-600 leading-tight mb-2">
                {resume.location}
                <br />[{resume.email}] | <br />
                {resume.linedIn}
              </p>
              <p className="text-sm font-semibold text-grey-500 mb-0">
                PROFESSIONAL SUMMARY
              </p>
              <p className="text-gray-500 text-sm line-clamp-4">
                {resume.summary}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-3">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[15px]">
                    {resume.fileName}
                  </h3>
                  <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Last Updated: {resume.createdAt}
                  </p>
                  {resume.isDefault && (
                    <span
                      className="
                        text-green-600 text-xs font-medium
                        bg-green-100
                        rounded-full
                        px-2 py-1
                      "
                    >
                      Default
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
