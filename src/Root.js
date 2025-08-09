import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import { GlobalStyle } from 'assets/styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { StyledContainer } from 'components/templates/StyledContainer/StyledContainer.style';
import { StyledWrapper } from 'components/templates/StyledWrapper/StyledWrapper.style';
import SwiperComponent from 'components/organisms/SwiperComponent/SwiperComponent';
import LeftComponent from 'components/organisms/LeftComponent/LeftComponent';
import CurrentSlideInfo from 'components/molecules/CurrentSlideInfo/CurrentSlideInfo';

const API_KEY = process.env.REACT_APP_API_KEY;

function Root() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);// eslint-disable-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState({});
  const [currentDisplayedDate, setCurrentDisplayedDate] = useState(
    JSON.parse(window.localStorage.getItem('currentDisplayedDate')) || {}
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    if (window.localStorage !== undefined) {
      const savedData = window.localStorage.getItem('data');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }
  }, []);

  const handleDate = ({ target }) => {
    const fullDate = target.value;
    const dateObject = new Date(target.value);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    setSelectedDate({
      fullDate,
      day,
      month,
      year,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setCurrentDisplayedDate(selectedDate);
    setCurrentSlideIndex(0);
    localStorage.setItem('currentDisplayedDate', JSON.stringify(selectedDate));

    axios
      .get(`https://api.nasa.gov/EPIC/api/natural/date/${selectedDate.fullDate}?api_key=${API_KEY}`)
      .then((response) => {
        localStorage.setItem('data', JSON.stringify(response.data));
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledContainer>
        <StyledWrapper>
          <LeftComponent
            selectedDate={selectedDate}
            handleDate={handleDate}
            handleForm={handleForm}
          />
          <SwiperComponent
            data={data}
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={setCurrentSlideIndex}
          />
          <CurrentSlideInfo
            data={data}
            currentSlideIndex={currentSlideIndex}
            currentDisplayedDate={currentDisplayedDate}
          />
        </StyledWrapper>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default Root;
