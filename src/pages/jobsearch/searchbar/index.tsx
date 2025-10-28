import { Search, MapPin, X } from "lucide-react"
import Button from "../../../components/ui/button/button"
import { Input } from "../../../components/ui/input/input"

interface SearchBarProps {
  jobSearch: string;
  setJobSearch: (value: string) => void;
  locationSearch: string;
  setLocationSearch: (value: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({ 
  jobSearch, 
  setJobSearch, 
  locationSearch, 
  setLocationSearch,
  onSearch 
}: SearchBarProps) {
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-7xl">
      <Input
        placeholder="Job title, keywords or company"
        leftIcon={Search}
        rightIcon={jobSearch ? X : undefined}
        onRightIconClick={() => setJobSearch("")}
        value={jobSearch}
        onChange={(e) => setJobSearch(e.target.value)}
        className="flex-1"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Input
        placeholder="City, state or remote"
        leftIcon={MapPin}
        rightIcon={locationSearch ? X : undefined}
        onRightIconClick={() => setLocationSearch("")}
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        className="flex-1"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Button
        icon={<Search className="w-4 h-4" />}
        iconPosition="left"
        className="w-full sm:w-auto"
        onClick={handleSearch}
      >
        Search Jobs
      </Button>
    </div>
  )
}