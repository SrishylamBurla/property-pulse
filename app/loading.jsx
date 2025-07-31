'use client'
import { ClipLoader } from "react-spinners";

const loading = () => {
    const override = {
        display: 'block',
        margin:'100px auto'
    }
    return ( 
        <ClipLoader
        color="#3b82f6"
        size={100}
        cssOverride={override}
        area-label='loading-spinner'
         />
     );
}
 
export default loading;