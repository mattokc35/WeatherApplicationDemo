import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Enter location for weather results!"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          sx={{ width: "170%", marginBottom: "10px", borderRadius: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ width: "170%", borderRadius: "10px" }}
        >
          Search
        </Button>
      </Box>
    </div>
  );
};

export default SearchBar;
