import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState,useContext } from "react";

import useFetch from '../../hooks/useFetch'
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { daysToWeeks } from "date-fns/fp";
const Hotel = () => {
  const { id } = useParams()
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(true);
  
  const { data,loading, error } = useFetch(`http://localhost:5000/api/hotel/aquire/${id}`)
  
  //Handling data array
  const photos=(data?.photos)?(data?.photos):[];
  console.log(data?.address)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const {date,options}=useContext(SearchContext)

  // Code To calculate time diff between date range to calculate cost
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
   const numberOfDays=dayDifference(date[0].startDate,date[0].endDate)
  console.log(date[0].startDate)// comment out

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (<div>Loading Please Wait..</div>) :
        (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img src={photos[slideNumber]} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data?.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data?.address} </span>
              </div>
              <span className="hotelDistance">
                Excellent location – 500m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data?.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
                {photos.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo.src}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">
                    Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                    Street Apartments has accommodations with air conditioning and
                    free WiFi. The units come with hardwood floors and feature a
                    fully equipped kitchenette with a microwave, a flat-screen TV,
                    and a private bathroom with shower and a hairdryer. A fridge is
                    also offered, as well as an electric tea pot and a coffee
                    machine. Popular points of interest near the apartment include
                    Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                    airport is John Paul II International Kraków–Balice, 16.1 km
                    from Tower Street Apartments, and the property offers a paid
                    airport shuttle service.
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {numberOfDays}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${numberOfDays*data?.cheapestPrice}</b> ({numberOfDays} nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )
      }
    </div>
  );
};

export default Hotel;
