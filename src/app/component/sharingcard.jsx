import React from 'react'
 import "./sharingcard.css"

function sharingcard({className , user ,userdetail ,id}) {
  return ( 
    
    <div className={className} id={id}>

     
<div className="card55">
    <div className="infos55">
        <div className="image55">{user.avatar}</div>
        <div className="info55">
            <div>
                <p className="name55">
                    CONFIFY
                </p>
                <p className="function55">
                    @{user.username} 
                </p>
            </div>
            <div className="stats55">
                    <p className="flex55 flex-col55">
                        Total-Message
                        <span className="state-value55">
                            {userdetail.totalMessages}
                        </span>
                    </p>
                    <p className="flex55">
                        Week-Message
                        <span className="state-value55">
                           {userdetail.weeklyMessages}
                        </span>
                    </p>
                    
            </div>
        </div>
    </div>
    <button className="request55" type="button55">
            Streak : {user.streak}🔥
        </button>
</div>


      
    </div>
  )
}

export default sharingcard
