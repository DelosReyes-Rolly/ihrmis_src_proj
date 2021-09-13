const LoaderComponent = () => {
    return ( 
        <div className="loader-component-container">
            <div className="patch">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div className="text"><strong>Please Wait...</strong></div>
            </div>
            
        </div>
     );
}
 
export default LoaderComponent;