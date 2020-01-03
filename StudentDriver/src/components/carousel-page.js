import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem } from 'mdbreact'
import carouselImage1 from '../assets/images/carousel-image1.jpg'
import carouselImage2 from '../assets/images/carousel-image2.jpg'
import carouselImage3 from '../assets/images/carousel-image3.png'

class CarouselPage extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className='container-fluid carousel-container'>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className='z-depth-1'
        >
          <MDBCarouselInner>
            <div className='text-center white-text mx-5 wow fadeIn caption'>
              <h1 className='mb-4 title-caption text-shadow'>
                <strong>EdVoR</strong>
              </h1>
              <h3 className='mb-4 text-shadow'>Providing faster and more reliable transportation for students</h3>
              <div class='btn btn-primary'>Get Started</div>

            </div>
            <MDBCarouselItem itemId='1'>
              <div className='mask rgba-black-light d-flex flex-column justify-content-center align-items-center'>
                <img
                  className='d-block w-100'
                  src={carouselImage1}
                  alt='First slide'
                />
              </div>
            </MDBCarouselItem>
            <MDBCarouselItem itemId='2'>
              <div>
                <img
                  className='d-block w-100'
                  src={carouselImage2}
                  alt='Second slide'
                />
              </div>
            </MDBCarouselItem>
            <MDBCarouselItem itemId='3'>
              <div>
                <img
                  className='d-block w-100'
                  src={carouselImage3}
                  alt='Third slide'
                />
              </div>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </div>
    )
  }
}

export default CarouselPage
