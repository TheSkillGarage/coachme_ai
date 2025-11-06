import { ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/button/button';
import { useNavigate, useParams } from 'react-router-dom';
import { mockResumes } from '../../../data';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export const ResumeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const resume = mockResumes.find((r) => r.id === Number(id));

  const renderBulletList = (text: string) => {
    // Split sentences by . ! ? but only when followed by a space and uppercase letter
    const sentences = text
      .split(/(?<=[.?!])\s+(?=[A-Z])/)
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <ul
        className="
          flex flex-wrap
          list-disc list-inside gap-x-4 gap-y-1 whitespace-normal break-words ml-2
        "
      >
        {sentences.map((s, i) => (
          <li
            key={i}
            className="
              flex-shrink
              min-w-[200px]
              marker:text-grey-500 marker:text-xs
              sm:min-w-[250px]
            "
          >
            {s}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/user/resume')}
          color="text-muted-foreground"
          bg="bg-white"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          className="
            bg-white
            rounded-3xl border border-[rgba(255,255,255,1)]
            transition-transform
            hover:text-foreground hover:-translate-y-[1px]
          "
        >
          Back
        </Button>
      </div>

      {resume ? (
        <Card hoverable={false} className="w-[392px] box-border md:w-full">
          <div className="flex flex-col mb-8 gap-2 items-center justify-center">
            <p className="text-xl font-semibold md:text-2xl">
              {resume?.firstName} {resume?.lastName}
            </p>
            <div className="flex flex-wrap items-center gap-1 justify-center">
              <p>{resume?.location}</p>
              <p>•</p>
              <p>{resume?.email}</p>
              <p> • </p>
              <p>{resume?.phone}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-grey-500 mb-1 md:text-xl">
              Professional Summary
            </p>
            <hr className="border-grey-50 mb-2" />
            <p>{resume?.summary}</p>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-grey-500 mb-1 md:text-xl">
              Experience
            </p>
            <hr className="border-grey-50 mb-2" />
            {resume?.experience?.map((exp) => {
              return (
                <div key={exp.id} className="mb-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[16px] md:text-lg">
                      {exp.jobTitle}
                    </p>
                    <p className="text-grey-300 shrink-0">
                      {exp.startDate}-{exp.endDate}
                    </p>
                  </div>
                  <p className="text-grey-300 mb-3">{exp?.company}</p>
                  {renderBulletList(exp?.description)}
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-grey-500 mb-1 md:text-xl">
              Education
            </p>
            <hr className="border-grey-50 mb-2" />
            {resume?.education?.map((edu) => {
              return (
                <div key={edu.id}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[16px] md:text-lg">
                      {edu.degree} in {edu.course}
                    </p>
                    <p className="text-grey-300 mb-3 shrink-0">
                      {edu?.graduationDate}
                    </p>
                  </div>
                  <p className="text-grey-300 mb-3">{edu?.institution}</p>
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-grey-500 mb-1 md:text-xl">
              Skills
            </p>
            <hr className="border-grey-50 mb-2" />
            <div className="flex flex-row flex-wrap items-center gap-2">
              {resume?.skills.map((skill, index) => {
                return (
                  <Badge key={index} className="p-1 text-grey-500 bg-[#F8F8F8]">
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          <p className="font-semibold text-xl text-center mb-2">
            The details for resume {id} are currently unavailable.
          </p>
          <p className="text-lg text-grey-300">Please, try again later.</p>
        </div>
      )}
    </div>
  );
};
