import loadingImg from "../assets/loading.gif";
const LoadingState = () => {
  return (
    <div className="text-center">
      <img src={loadingImg} className="load_icon" alt="Loading animation" />
    </div>
  );
};

export default LoadingState;
