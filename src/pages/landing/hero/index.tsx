import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button/button';
import imgHero from '../../../assets/hero.png';
import { Badge } from '../../../components/ui/badge';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      id='home'
      className="bg-[linear-gradient(90.1deg,#FFD3FB_-62.27%,#FFFFFF_51.24%,#FFFFFF_96.02%)]
         flex flex-col items-center justify-center
         p-5 md:p-20
         pb-0 md:pb-0
         mt-[64px] mb-8 md:mt-[72px]"
    >
      <Badge className="bg-transparent border border-primary-500 gap-2 mb-4 py-1 px-3">
        <Sparkles className="w-4 h-4 stroke-primary-500" />
        <span className="text-primary-500 text-sm font-medium text-center">
          AI-Powered Job Application Platform
        </span>
      </Badge>

      <h2 className="font-semibold text-[32px] md:text-[56px] text-center text-grey-500 mb-6">
        Your Next Big Career Move Starts Here.
      </h2>

      <p className="font-normal text-[18px] md:text-2xl text-center text-grey-500 mb-8">
        Land your dream job faster with automated job application, smart
        resumes, and tailored cover letters all in one platform.
      </p>

      <Button
        className="p-4 w-[100%] md:w-[216px] mb-8"
        icon={<ArrowRight className="w-4 h-4" />}
        iconPosition="right"
        onClick={() => navigate("/signup")}
      >
        Get Started for Free
      </Button>

      <div className="flex items-center justify-center gap-2 mb-8">
        <Clock className="w-4 h-4 stroke-primary-500" />
        <span className="text-sm text-grey-500">Setup in under 2 minutes</span>
      </div>

      <div
        className="bg-[linear-gradient(95.87deg,#FFD3FB_-11.49%,#FFF0FE_102.86%)]
         p-2 md:p-[22px]
         pb-0 md:pb-0
         rounded-t-[11px] md:rounded-t-[27px]
         overflow-hidden
         w-full max-w-[1004px] md:mx-auto"
      >
        <img
          src={imgHero}
          alt="Dashboard hero image"
          className="w-full h-auto object-contain sm:object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
