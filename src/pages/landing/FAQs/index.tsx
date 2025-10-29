import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

interface FAQs {
  question: string;
  answer: string;
}

const faqs: FAQs[] = [
  {
    question: 'How does the automated job application work?',
    answer:
      'Our platform automates your job applications by submitting your CV and personalized cover letter directly to job listings that match your profile.',
  },
  {
    question: 'Can I generate personalized cover letters?',
    answer:
      'Yes! You can automatically generate unique, personalized cover letters tailored to each job application.',
  },
  {
    question: 'Will my data and applications remain private?',
    answer:
      'Absolutely. Your data and applications are encrypted and stored securely. We never share your information with third parties without consent.',
  },
  {
    question: 'Is the platform free to use?',
    answer:
      'The platform offers a free tier with optional premium features for enhanced automation and customization.',
  },
  {
    question: 'Do I need to upload my CV or resume?',
    answer:
      'Yes, uploading your CV or resume helps us tailor job applications and generate accurate cover letters.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="bg-[#FFF9FD] py-4 md:py-12 px-4 sm:px-8 md:px-16 lg:px-24 mb-6 md:mb-10 font-inter"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="space-y-2 text-center mb-12">
          <Badge className="text-primary-500 border border-primary-500 bg-white mb-4">
            FAQs
          </Badge>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight font-inter">
            Find Answers to Common Questions Here
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-[0.4px] border-[#E8E8E8] hover:shadow-md rounded-xl transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-5 sm:px-6 py-4.5 text-left text-base sm:text-lg font-[400] text-[#111827]  focus:outline-none"
              >
                <span className="flex-1 text-grey-500 font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-[#B061A2]' : ''
                  }`}
                />
              </button>

              {/* Answer with animation */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? 'max-h-40 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-2'
                }`}
              >
                <div className="px-5 sm:px-6 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
