import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/app/components/molecules/dropdown-menu";
import { Button } from "@/app/components/atoms/button";
import { Chip } from "@nextui-org/react";

interface FilterProps {
  onFilterChange: (filter: { field: string, direction: string } | null) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);

  const handleFilterChange = (field: string, direction: string) => {
    setSelectedFilter(`${field}-${direction}`);
    onFilterChange({ field, direction });
  };

  const resetFilters = () => {
    setSelectedFilter(null);
    onFilterChange(null);
  };

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={selectedFilter === "salary-desc"}
            onCheckedChange={() => handleFilterChange("salary", "desc")}
          >
            Salary - Descending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFilter === "salary-asc"}
            onCheckedChange={() => handleFilterChange("salary", "asc")}
          >
            Salary - Ascending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFilter === "createdAt-desc"}
            onCheckedChange={() => handleFilterChange("createdAt", "desc")}
          >
            Created At - Descending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFilter === "createdAt-asc"}
            onCheckedChange={() => handleFilterChange("createdAt", "asc")}
          >
            Created At - Ascending
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <Button variant="ghost" onClick={resetFilters} className="w-full mt-2">
            Reset Filter Choices
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedFilter && (
        <Chip
          isCloseable
          onClose={resetFilters}
          color="default"
          className="flex items-center space-x-2"
        >
          {selectedFilter.replace("-", " - ")}
        </Chip>
      )}
    </div>
  );
};

export default Filter;
