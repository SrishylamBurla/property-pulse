import Link from "next/link";

const InfoBox = ({heading, children, backgroundColor='bg-grey-100', textColor= 'text-grey-800', buttonInfo}) => {
    return ( 
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
              {children}
            </p>
            <Link href={buttonInfo.link} passHref>
              <div className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700 cursor-pointer`}>
                {buttonInfo.title}
              </div>
            </Link>
          </div>
     );
}
export default InfoBox;