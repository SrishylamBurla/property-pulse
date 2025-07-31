"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h1 className="text-xl text-center font-bold pt-2">
        Share this Property
      </h1>
      <div className="flex justify-center gap-3 pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Checkout this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator='::'
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
