'use client';
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/app/components/molecules/dropdown-menu";
import { Button } from "@/app/components/atoms/button";
import { Input } from "@/app/components/atoms/input";
import { Chip } from "@nextui-org/react";

interface SearchProps {
  onSearch: (search: { field: string, query: string }) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [selectedField, setSelectedField] = React.useState('name');
  const [query, setQuery] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState<{ field: string, query: string } | null>(null);

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
  };

  const handleSearch = () => {
    if (query) {
      const search = { field: selectedField, query };
      setSearchQuery(search);
      onSearch(search);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery(null);
    setQuery('');
    onSearch({ field: '', query: '' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ( e.key === 'Enter' ) {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 flex-wrap space-y-2 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Select a Search Field</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={selectedField} onValueChange={handleFieldChange}>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="companyName">Company Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="location">Location</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="salary">Salary</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="max-w-40"
      />
      {searchQuery && (
        <div className="flex items-center space-x-2">
          <Chip color="default" isCloseable onClose={handleResetSearch}>
            {searchQuery.field}: {searchQuery.query}
          </Chip>
        </div>
      )}
    </div>
  );
};

export default Search;
