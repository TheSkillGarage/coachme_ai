import { useState } from "react";
import Button from "../../../components/ui/button/button";
import { Input } from "../../../components/ui/input/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Drawer } from "../../../components/ui/drawer";
import { ChevronDown } from "lucide-react";
import type { FilterState } from "../../../types";
import Slider from "rc-slider";

interface FiltersMobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClearAll: () => void;
}

export default function FiltersMobileDrawer({
  open,
  onOpenChange,
  filters,
  setFilters,
  onClearAll,
}: FiltersMobileDrawerProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    jobType: true,
    salary: true,
    experience: true,
    company: true,
  });

  const [tempSalaryRange, setTempSalaryRange] = useState(filters.salaryRange);

  const handleSalaryChange = (value: number | number[]) => {
    setTempSalaryRange(value as number[]);
  };
  
  const handleSalaryChangeComplete = (value: number | number[]) => {
    setFilters({ ...filters, salaryRange: value as number[] });
  };


  const handleClearAll = () => {
    setTempSalaryRange([0, 200]);
    onClearAll();
  };
  

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!open) return null;

  return (
    <Drawer
      open={open}
      onClose={() => onOpenChange(false)}
      side="bottom"
      title="Filters"
      height="h-[90vh]"
      showCloseButton={true}
      closeOnOverlayClick={true}
      className="rounded-t-lg"
    >
      <div className="p-4 space-y-6">
        <button
          onClick={handleClearAll}
          className="text-red-600 text-sm font-medium cursor-pointer hover:text-red-700 ml-auto block"
        >
          Clear All
        </button>
        <div className="border-b-[0.4px] border-b-[rgba(150,150,150,1)] pb-6">
          <button
            onClick={() => toggleSection("location")}
            className="flex items-center justify-between w-full mb-3 hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-sm">Location</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                expandedSections.location ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections.location && (
            <div className="space-y-3">
              <Input
                placeholder="e.g San Francisco"
                className="mb-3"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
              <div className="space-y-2">
                {["Remote", "Hybrid", "Onsite"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.workType.includes(type)}
                      onChange={(checked) => {
                        setFilters({
                          ...filters,
                          workType: checked
                            ? [...filters.workType, type]
                            : filters.workType.filter((t) => t !== type),
                        });
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-b-[0.4px] border-b-[rgba(150,150,150,1)] pb-6">
          <button
            onClick={() => toggleSection("jobType")}
            className="flex items-center justify-between w-full mb-3 hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-sm">Job Type</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                expandedSections.jobType ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections.jobType && (
            <div className="space-y-2">
              {["Full-time", "Part-time", "Contract", "Internship"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.jobType.includes(type)}
                      onChange={(checked) => {
                        setFilters({
                          ...filters,
                          jobType: checked
                            ? [...filters.jobType, type]
                            : filters.jobType.filter((t) => t !== type),
                        });
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                )
              )}
            </div>
          )}
        </div>
        <div className="border-b-[0.4px] border-b-[rgba(150,150,150,1)] pb-6">
          <button
            onClick={() => toggleSection("salary")}
            className="flex items-center justify-between w-full mb-3 hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-sm">Salary Range</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                expandedSections.salary ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections.salary && (
            <div className="space-y-3">
            <Slider
              range
              min={0}
              max={200}
              value={tempSalaryRange}
              onChange={handleSalaryChange}
              onChangeComplete={handleSalaryChangeComplete}
              styles={{
                track: {
                  backgroundColor: "#761f6e",
                  height: 10,
                  borderRadius: 4,
                  background: "#761f6e"
                },
                handle: {
                  borderColor: "#761f6e",
                  height: 20,
                  width: 20,
                  backgroundColor: "white",
                  borderWidth: 1,
                  opacity: 1,
                },
                rail: {
                  backgroundColor: "#e5e7eb",
                  height: 10,
                  borderRadius: 4,
                },
              }}
            />

              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  ${tempSalaryRange[0]}K
                </span>
                <span className="text-xs text-gray-500">
                  ${tempSalaryRange[1]}K
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="border-b-[0.4px] border-b-[rgba(150,150,150,1)] pb-6">
          <button
            onClick={() => toggleSection("experience")}
            className="flex items-center justify-between w-full mb-3 hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-sm">Experience Level</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                expandedSections.experience ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections.experience && (
            <div className="space-y-2">
              {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.experience.includes(level)}
                    onChange={(checked) => {
                      setFilters({
                        ...filters,
                        experience: checked
                          ? [...filters.experience, level]
                          : filters.experience.filter((l) => l !== level),
                      });
                    }}
                  />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="pb-6">
          <button
            onClick={() => toggleSection("company")}
            className="flex items-center justify-between w-full mb-3 hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-sm">Company</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                expandedSections.company ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections.company && (
            <Input
              placeholder="e.g OpenAI"
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            />
          )}
        </div>

        <Button className="w-full mb-4" onClick={() => onOpenChange(false)}>
          Apply Filters
        </Button>
      </div>
    </Drawer>
  );
}
