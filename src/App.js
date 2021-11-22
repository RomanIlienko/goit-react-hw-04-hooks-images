import { useState, useEffect } from 'react';

import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery'
import MyLoader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

import { fetchPagesList } from 'services/PixaBayView';



const App = () => {
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [largeImage, setLargeImg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return
    }

    function fetchPages() {
      setIsLoading(true);
      
      fetchPagesList(searchQuery, currentPage)
        .then(images => {
          setImages(prevState => [...prevState, ...images]);
        })
        .catch(error => setError("Something went wrong. Try again."))
        .finally(() => {
          setIsLoading(false)

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
    };
    fetchPages()
  }, [searchQuery, currentPage])

  const onChangeQuery = query => {
    setSearchQuery(query)
    setCurrentPage(1)
    setImages([])
    setError(null)
    setLargeImg('')
  };
  
  const bigImage = event => {
    setLargeImg(event.target.dataset.url);
    setTags(event.target.alt);

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const buttonClickOnMore = () => {
    setCurrentPage((state) => state + 1);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />

      {error && <Error textError={error} />}

      {images.length > 0 && !error && (
        <ImageGallery
              images={images}
          ocClick={bigImage} />
      )}
        
      {isLoading && <MyLoader />}

      {shouldRenderLoadMoreButton && <Button loadMore={buttonClickOnMore} />}
        
      {showModal &&
        <Modal onClose={toggleModal}>
         <img src={largeImage} alt={tags} />
        </Modal>
      }
    </>
  )
}

export default App


// class App extends React.Component {
//   state = {
//     hits: [],
//     currentPage: 1,
//     searchQuery: '',
//     isLoading: false,
//     error: null,
//     selectedImg: '',

//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchPages()
//     }
//    }

//   onChangeQuery = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       hits: [],
//       error: null,
//       selectedImg: '',
//       showModal: false,
//     });
//   };
  
//   fetchPages = () => {
//     const { currentPage, searchQuery } = this.state;

//     const options = {
//       searchQuery,
//       currentPage,
//     };

//     this.setState({ isLoading: true });

//     fetchPagesList(options)
//       .then(hits => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits],
//           currentPage: prevState.currentPage + 1,
//         }));
//       })
//       .catch(error => this.setState({ error: "Something went wrong. Try again." }))
//       .finally(() => {
//         this.setState({ isLoading: false });

//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: "smooth",
//         });
//       });
//   };
  
//   setLargeImg = image => {
//     this.setState({ selectedImg: image.largeImageURL });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal
//     }))
//   }

//   render() {
//     const { hits, isLoading, error, showModal, selectedImg } = this.state;
//     const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;
    
//     return (
//       <>
//         <Searchbar onSubmit={this.onChangeQuery} />

//           { error && <Error textError={error} />}

//         {hits.length > 0 && !error && 
//           <ImageGallery>
//           {hits.map(hit => (
//             <ImageGalleryItem
//               key={hit.id}
//               hit={hit}
//               setLargeImg={this.setLargeImg}
//             />
//           ))}
//         </ImageGallery>
//         }
        
//         {isLoading && <MyLoader />}

//         {shouldRenderLoadMoreButton && <Button loadMore={this.fetchPages} />}
        
//         {showModal && <Modal largeImgUrl={selectedImg} onClose={this.toggleModal} />}
//       </>
//     )
//    }
// }