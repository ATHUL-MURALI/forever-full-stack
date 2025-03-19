// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import './VirtualTry.css';
// import { ShopContext } from '../context/ShopContext';
// import { useParams } from 'react-router-dom';

// const VirtualTry = () => {
//   const { productId } = useParams();
//   const [personImage, setPersonImage] = useState(null);
//   const [clothImage, setClothImage] = useState(null);
//   const [resultImage, setResultImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { addToCart, all_product } = useContext(ShopContext);

//   const product = all_product.find((p) => p.id === Number(productId));

//   const handlePersonImageUpload = (event) => {
//     setPersonImage(event.target.files[0]);
//   };

//   const handleClothImageUpload = (event) => {
//     setClothImage(event.target.files[0]);
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product.id);
//       alert('Product added to cart!');
//     }
//   };

//   const handleDownloadImage = () => {
//     if (product?.image) {
//       const link = document.createElement('a');
//       link.href = `http://localhost:4000/images/${encodeURIComponent(product.image.split('/').pop())}`;
//       link.download = product.name;
//       link.click();
//     }
//   };

//   const handleTryOn = async () => {
//     if (!personImage || !clothImage) {
//       setErrorMessage('Please upload both images.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('personImage', personImage);
//     formData.append('clothImage', clothImage);

//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:4000/process-vitons', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.data && response.data.result) {
//         setResultImage(`http://localhost:4000${response.data.result}`);
//         setErrorMessage('');
//       } else {
//         setErrorMessage('Something went wrong! Please try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Failed to process the try-on request.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="virtual-try-page">
//       {isLoading && (
//         <div className="loading-overlay">
//           <div className="spinner"></div>
//           <p className="loading-message">Your try-on image is processing, please wait...</p>
//         </div>
//       )}
//       <div className="virtual-try-container">
//         <h1 className="virtual-try-title">✨ Virtual Try-On Experience ✨</h1>
//         <p className="virtual-try-subtitle">
//           Transform your style effortlessly. Upload your images to see the magic!
//         </p>
//         <p className="virtual-try-subtitle2">
//           <em>Follow these steps:</em><br />
//           <em>1. Download the product image.</em><br />
//           <em>2. Upload the downloaded product image.</em><br />
//           <em>3. Upload your person image.</em><br />
//           <em>4. Click "Try On" and wait for a moment to see the result!</em>
//         </p>


//         <div className="content-section">
//           <div className="image-upload">
//             <div className="image-preview-container">
//               <button className="button upload-image-button">
//                 <label htmlFor="person-upload">Upload Person Image</label>
//               </button>
//               <input
//                 id="person-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePersonImageUpload}
//                 style={{ display: 'none' }}
//               />
//               {personImage && (
//                 <img
//                   src={URL.createObjectURL(personImage)}
//                   alt="Person"
//                   className="preview-image large-image"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="image-upload">
//             <div className="image-preview-container">
//               <button className="button upload-image-button">
//                 <label htmlFor="cloth-upload">Upload Downloaded product Image</label>
//               </button>
//               <input
//                 id="cloth-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleClothImageUpload}
//                 style={{ display: 'none' }}
//               />
//               {clothImage && (
//                 <img
//                   src={URL.createObjectURL(clothImage)}
//                   alt="Cloth"
//                   className="preview-image large-image"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="product-info">
//             {product && (
//               <>
//                 <img src={product.image} alt={product.name} className="small-product-image" />
//                 <h3 className="product-name">{product.name}</h3>
//                 <button onClick={handleDownloadImage} className="button fancy-download-button">
//                   Download the Product Image
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="try-on-button-container">
//           <button onClick={handleTryOn} className="button try-on-button">
//             Try On
//           </button>
//         </div>

//         {resultImage && (
//           <div className="result-section">
//             <h3 className="rendered-title">Your Try-On Result</h3>
//             <img src={resultImage} alt="Rendered Result" className="rendered-image" />
//             <button onClick={handleAddToCart} className="button add-to-cart-button">
//               Add to Cart
//             </button>
//           </div>
//         )}

//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default VirtualTry;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import './VirtualTry.css';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';

const VirtualTry = () => {
  const { productId } = useParams();
  const [personImage, setPersonImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { addToCart, products, backendUrl } = useContext(ShopContext);

  const product = products.find((p) => p._id === productId);

  const handlePersonImageUpload = (event) => {
    setPersonImage(event.target.files[0]);
  };

  const handleClothImageUpload = (event) => {
    setClothImage(event.target.files[0]);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, 'M'); // Defaulting size to 'M' for now — we could add size selection later
      alert('Product added to cart!');
    }
  };

  const handleDownloadImage = () => {
    if (product?.image) {
      const link = document.createElement('a');
      link.href = `${backendUrl}/images/${encodeURIComponent(product.image.split('/').pop())}`;
      link.download = product.name;
      link.click();
    }
  };

  const handleTryOn = async () => {
    if (!personImage || !clothImage) {
      setErrorMessage('Please upload both images.');
      return;
    }

    const formData = new FormData();
    formData.append('personImage', personImage);
    formData.append('clothImage', clothImage);

    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/process-vitons`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.result) {
        setResultImage(`${backendUrl}${response.data.result}`);
        setErrorMessage('');
      } else {
        setErrorMessage('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to process the try-on request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="virtual-try-page">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-message">Your try-on image is processing, please wait...</p>
        </div>
      )}
      <div className="virtual-try-container">
      <video autoPlay loop muted className="background-video">
      <source src="https://videos.pexels.com/video-files/12978459/12978459-hd_1920_1080_24fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        <h1 className="virtual-try-title">VIRTUAL TRY-ON</h1>
        <p className="virtual-try-subtitle">
          Transform your style effortlessly. Upload your images to see the magic!
        </p>
        <p className="virtual-try-subtitle2">
          <text>Follow these steps </text>
          <span>&#10549;</span><br />
          <text>1. Download the product image.</text><br />
          <text>2. Upload the downloaded product image.</text><br />
          <text>3. Upload your person image.</text><br />
          <text>4. Click "Try On" and wait for a moment to see the result!</text>
        </p>

        <div className="content-section">
          <div className="image-upload">
            <div className="image-preview-container">
              <button className="button upload-image-button">
                <label htmlFor="person-upload">Upload Person Image</label>
              </button>
              <input
                id="person-upload"
                type="file"
                accept="image/*"
                onChange={handlePersonImageUpload}
                style={{ display: 'none' }}
              />
              {personImage && (
                <img
                  src={URL.createObjectURL(personImage)}
                  alt="Person"
                  className="preview-image large-image"
                />
              )}
            </div>
          </div>

          <div className="image-upload">
            <div className="image-preview-container">
              <button className="button upload-image-button">
                <label htmlFor="cloth-upload">Upload Product Image</label>
              </button>
              <input
                id="cloth-upload"
                type="file"
                accept="image/*"
                onChange={handleClothImageUpload}
                style={{ display: 'none' }}
              />
              {clothImage && (
                <img
                  src={URL.createObjectURL(clothImage)}
                  alt="Cloth"
                  className="preview-image large-image"
                />
              )}
            </div>
          </div>

          <div className="product-info">
            {product && (
              <>
                <img src={product.image} alt={product.name} className="small-product-image" />
                <h3 className="product-name">{product.name}</h3>
                <button onClick={handleDownloadImage} className="button fancy-download-button">
                  Download the Product Image
                </button>
              </>
            )}
          </div>
        </div>

        <div className="try-on-button-container">
          <button onClick={handleTryOn} className="button try-on-button">
            Try On
          </button>
        </div>

        {resultImage && (
          <div className="result-section">
            <h3 className="rendered-title">Your Try-On Result</h3>
            <img src={resultImage} alt="Rendered Result" className="rendered-image" />
            <button onClick={handleAddToCart} className="button add-to-cart-button">
              Add to Cart
            </button>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      </div>
  );
};

export default VirtualTry;
