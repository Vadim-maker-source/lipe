import React from 'react';
import { useNavigate } from 'react-router-dom';
import attractions from '../../components/shared/attractionsData';

interface SearchResultsProps {
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
  const navigate = useNavigate();

  const filteredAttractions = attractions.filter((attraction) =>
    attraction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  const handleAttractionClick = (id: number) => {
    navigate(`/attraction/${id}`);
  };

  return (
    <div className="search-results">
      {filteredAttractions.length > 0 ? (
        <>
          <p className="results-count">Найдено: {filteredAttractions.length}</p>
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className="search-result-item"
              onClick={() => handleAttractionClick(attraction.id)}
            >
              <p>{highlightMatch(attraction.name, searchQuery)}</p>
            </div>
          ))}
        </>
      ) : (
        <p className="nothing-found">Ничего не найдено</p>
      )}
    </div>
  );
};

export default SearchResults;