import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch"
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/api/hotel/?featured=true&min=50&max=500&limit=4");
  
  return (
    <div className="fp">
       {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                // src={item.photos[0]}
                src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item?.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item?.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )} 
    </div>
  );
};
export default FeaturedProperties