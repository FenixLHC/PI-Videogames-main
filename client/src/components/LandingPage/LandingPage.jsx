//import styles from './LandingPage.css'
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import  "./LandingPage.css";

export default function LandingPage() {
  const [render,setRender]=useState('curtain')
  const loadingAnimationTime = 2000;
  const timeout=2000;

   useEffect(()=>{ 
    setTimeout(() => {
    setRender('quote');
   }, timeout);
 }, []);
  // let flag = true;
  const quote = ["Welcome", "to", "Henry", "videogames"];
  let delay = 0;

  if (render==='curtain'){
    
    return (
      // <div>
      //   <div className={`${styles.flex} ${styles.curtain}`}>
      //     <div
      //       className={`${styles.progressBar} ${styles.progressGrowAnimation}`}
      //     ></div>
      //   </div>
      // </div>
      <div>
      <div className={`flex curtain`}>
        <div
          className={`progressBar progressGrowAnimation`}
        ></div>
      </div>
    </div>
    );
  }else if (render==='quote'){
    return(
      <div>
        <div className="boxContainer">
          <div className={`box flex`}>
            {
              quote.map(q=>{
                delay=delay+22;
                return(
                  <span className="animateSlideup" >{q}</span>
                )
              })
            }
          </div>
          <Link to="/Home">
      <button>Enter</button>
    </Link>
        </div>
      </div>
    )
  }
  {/* <div style='overflow: hidden;'>
    <div className={`${styles.box} ${styles.flex}`}>
      {quote.map((q)=>{
        <span className={styles.animateSlideup} style>{q}</span>
  
      })
    }
    </div>
  </div> */}
  {/* <div className={`${styles.box} ${styles.flex}`}>
    <div class="flex" id="main"></div>
    <h1>Welcome to the best Website about Videogames you've ever seen</h1>
    <Link to="/Home">
      <button>Enter</button>
    </Link>
  </div> */}
}

{
  /* <div className='flex curtain'>
           <div className='progressBar progressGrowAnimation'>
          </div> 

      </div> */
}
{
  /* <div className={styles.flex&& styles.curtain}>
          <div className={styles.progressBar&&styles.progressGrowAnimation}>
          </div>

      </div> */
}
