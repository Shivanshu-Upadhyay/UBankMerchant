import React from 'react'
// import Atm from './Atmcard/Atm'
// import Lequed from './Lequed/Lequed';
// import Diposite from './Diposite/Diposite';
import Currency from './Currency/Currency'
import Transition from './Transition/Transition';
import './style.css'

function Dashbord() {
  return (
    <div>
      {/* <div className="row">
        <div className="col-3">
          <Atm />
        </div>
        <div className='col-2'>
       <Lequed/>
        </div>
      </div> */}
      <Currency />
    </div>
  );
}

export default Dashbord