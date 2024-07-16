import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import './styles/base.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      setData([]);
      setTotalPages(1);
      setTotalCount(0);
      return;
    }

    const fetchData = async (query, page = 1, limit = 5) => {
      setIsLoading(true);
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL, {
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
          },
          params: {
            namePrefix: query,
            offset: (page - 1) * limit,
            limit: limit,
          }
        });
        setData(response.data.data);
        setTotalCount(response.data.metadata.totalCount);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(searchQuery, currentPage, itemsPerPage);
  }, [searchQuery, currentPage, itemsPerPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBox
        placeholder="Search places..."
        variant="default"
        onSearch={handleSearch}
      />
      <Table 
        data={data} 
        searchQuery={searchQuery} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
      />
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div>Loading...</div>
        </div>
      )}
      {totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default App;
