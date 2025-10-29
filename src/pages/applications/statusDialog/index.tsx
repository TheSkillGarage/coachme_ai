import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  X,
  CheckIcon,
} from 'lucide-react';

import Button from '../../../components/ui/button/button';
import Dialog from '../../../components/ui/dialog';
import { CustomDropdown } from '../../../components/ui/dropdown';
import { Badge } from '../../../components/ui/badge';
import { renderBadgeByStatus, statuses } from '../helpers';
import type { Application } from '..';

interface StatusDialogProps {
  isShowDetails: boolean;
  setIsShowDetails: (val: boolean) => void;
  applicationItem: Application;
}

export const StatusDialog: React.FC<StatusDialogProps> = ({
  isShowDetails,
  setIsShowDetails,
  applicationItem,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    applicationItem.status
  );

  const handleChange = (item: string) => {
    setSelectedItem(item);
    setOpen(false);
  };

  return (
    <Dialog
      className="min-w-[392px] md:min-w-[632px] pt-2 md:pt-6 md:px-4 rounded-3xl"
      isOpen={isShowDetails}
      onClose={() => setIsShowDetails(false)}
      title="Application Details"
      titleSize="2xl"
      footer={
        <div className="flex flex-col md:flex-row pb-2 md:pb-6 justify-end gap-4">
          <Button
            onClick={() => setIsShowDetails(false)}
            className="p-4 min-w-28 text-grey-500 bg-white border border-grey-200"
            icon={<X className="w-4 h-4 text-grey-500" />}
          >
            Cancel
          </Button>
          <Button
            icon={<CheckIcon className="w-4 h-4" />}
            className="p-4 min-w-28 bg-primary-600 text-white"
          >
            Save
          </Button>
        </div>
      }
    >
      <div>
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-xl">{applicationItem.jobTitle}</p>
          <Badge
            className={`${renderBadgeByStatus(
              applicationItem.status
            )} cursor-pointer`}
            onClick={() => setIsShowDetails(true)}
          >
            {applicationItem.status}
          </Badge>
        </div>
        <div className="flex gap-2 mb-4">
          <p className="text-grey-500">{applicationItem.company}</p>
          <MapPin className="text-grey-300 w-5 h-5" />
          <p className="text-grey-300">{applicationItem.location}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            <Clock className="text-grey-300 w-5 h-5" />
            <p className="text-grey-300">
              Applied {applicationItem.dateApplied}
            </p>
          </div>

          <p className="text-grey-500 text-lg font-semibold">
            {applicationItem.salary}
          </p>
        </div>
      </div>
      <p className="mb-2 text-grey-500">Update Status</p>
      <div className="mb-8">
        <CustomDropdown
          open={open}
          setOpen={setOpen}
          width="w-full min-w-full"
          align="right"
          trigger={
            <Button
              className="min-w-full [&>span]:min-w-full min-h-[56px] px-4 border border-[#E8E8E8] text-grey-500 text-[16px] justify-start box-border"
              variant="outline"
            >
              <div className="flex justify-between items-center min-w-full box-border">
                {selectedItem || applicationItem.status}
                {open ? (
                  <ChevronUp className="w-4 h-4 text-grey-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-grey-200" />
                )}
              </div>
            </Button>
          }
        >
          {statuses.map((status) => {
            return (
              <button
                className="
                    block w-full min-h-[54px] text-left text-grey-500 hover:bg-purple-500 rounded-md px-4 cursor-pointer
                "
                onClick={() => handleChange(status)}
              >
                {status}
              </button>
            );
          })}
        </CustomDropdown>
      </div>
    </Dialog>
  );
};
