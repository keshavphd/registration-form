import { Audio } from 'react-loader-spinner'


const Loader = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-black opacity-55 ">
        <div>
        <Audio
        height="80"
        width="80"
        radius="9"
        fixed
        bottom="0"
        color="yellow"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
        </div>
           
        
      <div className="text-3xl text-white">Please wait...</div>
           
        
        
      
    </div>
  );
};

export default Loader;
