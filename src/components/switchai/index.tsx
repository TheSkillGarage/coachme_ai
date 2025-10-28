import { useState } from 'react';

import { Switch } from '../ui/switch';
import imgAI from '../../assets/ai.png';

export const SwitchAI: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className="flex mb-8 justify-between 
    p-4 md:px-[20px] md:py-8 
    border border-primary-500 rounded-xl 
    bg-[linear-gradient(90.1deg,#FFD3FB_-62.27%,#FFFFFF_86.15%)]"
    >
      <div className="flex gap-3">
        <img
          src={imgAI}
          alt="Coach me AI switch"
          className="w-8 h-8 md:w-16 md:h-16"
        />
        <div className="max-w-[186px] md:max-w-full mr-1">
          <p className="font-semibold text-xl mb-2 leading-[140%]">
            Apply Faster with CoachMe AI
          </p>
          <p className="font-normal text-sm md:text-[16px] leading-[140%]">
            Let our AI handle job applications automatically for you
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center min-w-[133px]">
        <p className="font-semibold text-sm md:text-[16px]">Enable AI</p>
        <Switch
          size="xl"
          checked={isActive}
          onChange={(val) => setIsActive(val)}
        />
      </div>
    </div>
  );
};
