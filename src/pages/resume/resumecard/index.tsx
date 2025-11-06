import {
  Trash2,
  Download,
  Edit,
  MoreVertical,
  Upload,
  Eye,
} from 'lucide-react';
import Button from '../../../components/ui/button/button';
// import { Card } from '../../../components/ui/card';
import { CustomDropdown } from '../../../components/ui/dropdown';
import { useState } from 'react';
import Dialog from '../../../components/ui/dialog';
import { useNavigate } from 'react-router-dom';

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
  setCurrentStep: (step: string) => void;
  setRedirectFromList: (value: boolean) => void;
}
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
    fileName: 'Developer Resume',
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
    fileName: 'Product Resume',
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
    fileName: 'Designer Resume',
    createdAt: '18/5/25',
  },
];

export default function Resumes({
  setCurrentStep,
  setRedirectFromList,
}: IntroProps) {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<number | null>(null);
  const [resumesArray, setResumesArray] = useState<ResumeCard[]>(resumes);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeCard>();

  const handleRedirect = (id: number) => {
    navigate(`/user/resume/${id}`);
  };

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleDeleteResume = (id: number) => {
    setResumesArray(resumesArray.filter((resume) => resume.id !== id));
    setIsDeleteOpen(false);
  };

  const downloadResume = (
    content: string,
    fileName: string,
    format: 'pdf' | 'docx' | 'txt'
  ) => {
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      triggerDownload(blob, `${fileName}.txt`);
    } else if (format === 'docx') {
      const html = `
        <!DOCTYPE html>
        <html><head><meta charset="utf-8"></head>
        <body><pre>${content}</pre></body></html>`;
      const blob = new Blob([html], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      triggerDownload(blob, `${fileName}.docx`);
    } else if (format === 'pdf') {
      import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(content, 180);
        doc.text(lines, 10, 10);
        doc.save(`${fileName}.pdf`);
      });
    }
  };

  function triggerDownload(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full space-y-6">
      <div
        className="
          flex flex-col
          justify-between items-start mb-8
          lg:flex-row lg:items-center
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
          onClick={() => {
            setRedirectFromList(true);
            setCurrentStep('upload');
          }}
          className="
            flex
            w-full
            text-white
            bg-[#67005E]
            rounded-lg
            hover:bg-[#52004A] items-center gap-2 py-4 px-2
            mt-2
            lg:mt-0
            lg:w-[213px]
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
        {resumesArray.map((resume) => (
          <div
            key={resume.id}
            className="
              flex flex-col
              w-full
              p-0
              bg-transparent
              rounded-2xl border border-gray-200
              shadow-sm transition-all
              justify-between hover:shadow-md duration-200
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
                  <div>
                    <CustomDropdown
                      key={resume.id}
                      open={openId === resume.id}
                      trigger={
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(resume.id);
                          }}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </div>
                      }
                      width="w-[127px]"
                      align="right"
                    >
                      <div className="py-3 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            handleRedirect(Number(openId));
                          }}
                          className="
                            flex
                            w-full
                            text-left text-grey-500
                            items-center gap-2 hover:bg-gray-100 px-3 cursor-pointer
                           hover:opacity-100
                          "
                        >
                          <Eye className="w-4 h-4" />
                          <p>View</p>
                        </button>
                        <button
                          onClick={() => {
                            handleRedirect(Number(openId));
                          }}
                          className="
                            flex
                            w-full
                            text-left text-grey-500
                            items-center gap-2 hover:bg-gray-100 px-3 cursor-pointer
                          "
                        >
                          <Edit className="w-4 h-4" />
                          <p>Edit</p>
                        </button>
                        <button
                          onClick={() => {
                            downloadResume(
                              resume.summary,
                              resume.fileName,
                              'pdf'
                            );
                            setOpenId(null);
                          }}
                          className="
                            flex
                            w-full
                            text-left text-grey-500
                            items-center gap-2 hover:bg-gray-100 px-3 cursor-pointer
                          "
                        >
                          <Download className="w-4 h-4 shrink-0" />
                          <p>Download</p>
                        </button>
                        <button
                          onClick={() => {
                            setOpenId(0);
                            setIsDeleteOpen(true);
                            setSelectedResume(resume);
                          }}
                          className="
                            flex
                            w-full
                            text-left text-grey-500
                            items-center gap-2 hover:bg-gray-100 px-3 cursor-pointer
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                          <p>Delete</p>
                        </button>
                      </div>
                    </CustomDropdown>
                  </div>
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
          </div>
        ))}
      </div>

      {isDeleteOpen && (
        <Dialog
          title="Delete Resume"
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        >
          <div>
            <p>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{selectedResume?.fileName}</span>?
            </p>
            <Button
              className="bg-red-500 w-full mt-4 text-white"
              onClick={() => handleDeleteResume(Number(selectedResume?.id))}
            >
              Yes, delete
            </Button>
            <Button
              className="bg-gray-100 text-gray-600 w-full mt-4"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
