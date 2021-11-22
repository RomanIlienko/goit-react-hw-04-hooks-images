import { useState } from 'react';

import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import MyLoader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

import { fetchPagesList } from 'services/PixaBayView';



const App = () => {
  const [hits, setHits] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setSsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedImg, setSelectedImg] = useState('')
  const [showModal, setShowModal] = useState(false)

  const componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPages()
    }
   }

  const onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
      selectedImg: '',
    });
  };
  
  const fetchPages = () => {
    const { currentPage, searchQuery } = this.state;

    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    fetchPagesList(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error: "Something went wrong. Try again." }))
      .finally(() => {
        this.setState({ isLoading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };
  
  const setLargeImg = image => {
    this.setState({ selectedImg: image.largeImageURL });
    toggleModal();
  };

  const toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  // const { hits, isLoading, error, showModal, selectedImg } = this.state;
  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />

        { error && <Error textError={error.textError} />}

        {hits.length > 0 && !error && 
         <ImageGallery>
         {hits.map(hit => (
          <ImageGalleryItem
            key={hit.id}
            hit={hit}
            setLargeImg={setLargeImg}
           />
         ))}
         </ImageGallery>
        }
        
        {isLoading && <MyLoader />}

        {shouldRenderLoadMoreButton && <Button loadMore={fetchPages} />}
        
        {showModal && <Modal largeImgUrl={selectedImg} onClose={toggleModal} />}
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