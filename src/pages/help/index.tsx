import { CircleQuestionMark, Mail, MessageSquare, Phone } from 'lucide-react';
import { Card } from '../../components/ui/card';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';

interface HelpQuestions {
  question: string;
  answer: string;
}

interface ContactUs {
  method: string;
  value: string;
  icon: React.ReactNode;
}

const help: HelpQuestions[] = [
  {
    question: 'Can I customize the AI-generated cover letters?',
    answer:
      'Yes! After generating a cover letter, you can edit and personalize it before downloading or submitting it.',
  },
  {
    question: 'What should I do if I’m not getting any job matches?',
    answer:
      'Check that your profile and preferences are fully updated. Make sure your resume is uploaded, your skills are listed, and you’ve selected industries of interest. This helps our algorithm match you better.',
  },
  {
    question: 'Why can’t I upload my resume?',
    answer:
      'Ensure your resume is in PDF or DOCX format and under 10MB. If the issue persists, try refreshing the page or clearing your browser cache.',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'Go to your Profile → Settings → Security. Click on "Change Password" and follow the instructions. If you forgot your password, click “Forgot Password” on the login page to receive a code.',
  },
];

const contactUs: ContactUs[] = [
  {
    method: 'Live Chat',
    value: 'Chat with us for quick support',
    icon: <MessageSquare className="text-[#2563EB] shrink-0" />,
  },
  {
    method: 'Email',
    value: 'support@coachmeai.com',
    icon: <Mail className="text-[#166534] shrink-0" />,
  },
  {
    method: 'Call',
    value: '+2349067678987',
    icon: <Phone className="text-[#FF1D00] shrink-0" />,
  },
];

export default function Main() {
  const tags: HelmetProps = {
    pageTitle: 'Help',
    description: '',
  };

  return (
    <HelmetLayout {...tags}>
      <div className="">
        <p className="mb-2 font-semibold text-2xl">Help and Support</p>
        <p className="mb-6 font-normal text-[16px]">
          Get answers and support quickly
        </p>

        <Card hoverable={false} shadow="none">
          <p className="font-semibold text-lg md:text-xl mb-8">
            Frequently Asked Questions
          </p>

          <div className="flex flex-col gap-5 mb-5">
            {help.map((item) => (
              <Card hoverable={false} shadow="none">
                <div>
                  <div className="mb-1 flex items-start gap-3 md:gap-[22px]">
                    <CircleQuestionMark className="text-primary-500 shrink-0" />
                    <p className="font-semibold text-[16px]">{item.question}</p>
                  </div>
                  <p className="text-grey-300 text-sm ml-[36px] md:ml-[46px]">
                    {item.answer}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <p className="font-semibold text-lg md:text-xl mb-8">Contact Us</p>

          <div className="flex flex-col gap-5 mb-5">
            {contactUs.map((item) => (
              <Card hoverable={false} shadow="none">
                <div>
                  <div className="mb-1 flex items-start gap-3 md:gap-[22px]">
                    {item.icon}
                    <p className="font-semibold text-[16px]">{item.method}</p>
                  </div>
                  <p className="text-grey-300 text-sm ml-[36px] md:ml-[46px]">
                    {item.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </HelmetLayout>
  );
}
