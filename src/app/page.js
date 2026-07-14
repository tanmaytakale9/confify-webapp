 
import Logo from '@/app/component/logo'
import Link from 'next/link'
  
import React from 'react'  
import styles from './page.module.css' 
 
 
function page() {

 

  
 
  return (
    <> 

 <div className={`${styles.okay} ` }>

    <Logo className={`${styles.log}`}/>

    <div style={{display:'flex', alignItems:'center' , justifyContent:'center'}} className={`${styles.highlight}`} >

  
  <p>Say It. No Fear.</p>

  <p>No <span> Identity</span>.</p>

    </div>


    <div style={{display:'flex', alignItems:'center' , justifyContent:'center'}}  className={`${styles.second}`}>

 <span>
  Share your thoughts Anonymously.
 </span>
  
 <span>   Receive Honest message. Stay safe.
 </span>

    </div>
 

    <div className={`${styles.button}`}>
      
    <Link href="/log-in">
            <button className={styles.btn}>
              Create Your Link
            </button>
          </Link>
 </div>


<div className={`${styles.last}`}>

<div className={`${styles.loader}`}></div>

  <span>
    Your identity never revealed.
  </span>
</div> 

 </div>

 
     
    </>
  )
}

export default page
