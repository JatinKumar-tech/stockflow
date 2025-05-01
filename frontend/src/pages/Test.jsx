import React from "react";

const Test = () => {
  return (
    <>
      {/* <div className="border-5 h-screen ">
        <div className="flex  border-1 h-10 w-screen justify-between px-10">
          <div className="  ">Your name</div>
          <div className="flex gap-1 ">
          <div className="">/home</div>
          <div className="">/projects</div>
          <div className="">/articles</div>
          <div className="">/conact</div>
         
          </div>
          
        </div>
        <div className="flex justify-center">Frontend Developer</div>
      </div> */}
      <div className="border-2 border-red-900 p-2 m-2 h-screen ">

        <div className=" border-blue-600 p-2" >
        
          <div className=" flex flex-row justify-between  border-pink-600 p-2 " >
        
            <div className=" border-black  p-2 " >dashboard</div>
        
            <div className=" border-black p-2">
              <span>/profile</span>
              <span>/Help</span>
            </div>
        
          </div>
        
          <div className=" p-2 border-black flex gap-5" >
           <span>  holdings</span>
           <span>positions</span>
           <span>orders</span>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Test;
