import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CountDown from "../components/functions/CountDown";
import AnimationTitles from "../components/functions/AnimationTitles";
import Image1 from "../images/properties/picture-of-a-wooden-building-in-the-forest.webp";
import Image2 from "../images/properties/pexels-stan-krotov-12737424-1.webp";
import Image3 from "../images/properties/pexels-rachel-claire-8112843-1.webp";
import Image4 from "../images/properties/david-kovalenko-9-qFzV9a2Zc-unsplash.webp";
import Image5 from "../images/properties/house_big-1.webp";
import Image6 from "../images/properties/house_big.webp";

function Properties() {
  const images = [Image1, Image2, Image3, Image4, Image5, Image6];
  const titles = [
    "Cottage «Forrest 1»",
    "Freshness",
    "Wish house",
    "Spruce",
    "Residence Rybna",
    "Blue Sky",
  ];
  const agencies = [
    "@Red Oak Realty",
    "@ERA Ukraine Real Estate",
    "@UA real estate agency",
    "@Dream House",
    "@UA real estate agency",
    "@ERA Ukraine Real Estate",
  ];
  const bids = ["29.71", "14.81", "16.62", "17.01", "29.71", "17.31"]; 

  function like(e) {
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("fa-regular");
    e.target.classList.toggle("text-danger");
  }

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`card-${index}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; 
    const y = e.clientY - rect.top - rect.height / 2; 
    const tiltX = (y / rect.height) * 30; 
    const tiltY = -(x / rect.width) * 30; 

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.1)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`card-${index}`);
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <ParallaxProvider>
      <div className="properties">
        <Container>
          <AnimationTitles className="title mx-auto" title="Discover more properties" />

          <Parallax speed={-3}>
            <motion.div initial={{ x: -80 }} whileInView={{ x: 0 }} transition={{ duration: 0.8 }}>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  520: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper mt-4"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="card-wrapper">
                      <motion.div
                        id={`card-${index}`}
                        className="image-container"
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        <img src={image} className="card-image" alt="property" />
                        <motion.div
                          className="overlay d-flex flex-column align-items-center justify-content-center text-center"
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h5 className="title-text">{titles[index]}</h5>
                          <div className="details">
                            <p className="gray-90">{agencies[index]}</p>
                            <div className="d-flex align-items-center justify-content-center">
                              <motion.div
                                className="clock-animation me-3"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <i className="fa fa-clock text-white" style={{ fontSize: "1.5rem" }}></i>
                              </motion.div>
                              <div className="text-center">
                                <CountDown h={10 + index} m={20} s={15} />
                                <span className="gray-90">Remaining Time</span>
                              </div>
                            </div>
                            <div className="bid-info mt-3">
                              <h6 className="text-white">{bids[index]} ETH</h6>
                              <span className="gray-90">Current Bid</span>
                            </div>
                            <i
                              className="fa-regular fa-heart like mt-3"
                              onClick={like}
                              style={{ fontSize: "1.5rem", color: "white" }}
                            ></i>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-button-prev custom-nav-button">
                <ChevronLeft size={32} color="white" />
              </div>
              <div className="swiper-button-next custom-nav-button">
                <ChevronRight size={32} color="white" />
              </div>
            </motion.div>
          </Parallax>
        </Container>

        <style jsx>{`
          .properties {
            padding: 40px 0;
            color: white;
            position: relative;
          }

          .card-wrapper {
            padding: 10px;
          }

          .image-container {
            position: relative;
            border-radius: 12px;
            width: 100%;
            height: 280px;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1), 0 4px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .image-container:hover {
            box-shadow: 0 8px 30px rgba(255, 255, 255, 0.2), 0 8px 60px rgba(0, 0, 0, 0.4);
          }

          .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            opacity: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 20px;
            transition: opacity 0.3s ease;
            border-radius: 12px;
            color: white;
          }

          .title-text {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            position: relative;
            top: 0;
          }

          .details {
            opacity: 0;
            margin-top: 20px;
            transition: opacity 0.3s ease;
          }

          .image-container:hover .title-text {
            transform: translateY(-10px);
          }

          .image-container:hover .details {
            opacity: 1;
          }

          .clock-animation {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .bid-info {
            margin-top: 1rem;
          }

          .like {
            cursor: pointer;
          }

          /* Custom styles for Swiper navigation arrows */
          .custom-nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2rem;
            z-index: 10;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
          }

          .swiper-button-prev.custom-nav-button {
            left: -40px;
          }

          .swiper-button-next.custom-nav-button {
            right: -40px;
          }

          .mySwiper .swiper-pagination-bullet-active {
            background-color: white;
          }
        `}</style>
      </div>
    </ParallaxProvider>
  );
}

export default Properties;
