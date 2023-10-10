// components/NFTPreview.js

type NFTPreviewProps = {
    imageUrl: string;
    tokenAddress: string;
    };


const NFTPreview = ({ imageUrl, tokenAddress } : NFTPreviewProps) => (
  <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10">
    <img className="w-full h-64 object-cover object-center" src={imageUrl} alt={tokenAddress} />
    <div className="p-4">
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        View Token
      </button>
    </div>
  </div>
);


export default NFTPreview;
