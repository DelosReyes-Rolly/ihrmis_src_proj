import { SyncLoader } from "react-spinners";
const LoaderComponent = () => {
  return (
    <div className="loader-component-container">
      <div className="patch">
        <div className="">
          <SyncLoader size={15} color="rgba(0, 78, 135, 1)" />
        </div>
        <div className="text">
          <strong>Please wait for a moment</strong>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;
