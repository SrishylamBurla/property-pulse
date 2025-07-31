import Link from 'next/link';
import InfoBox from './infoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          
          {/* For Renters */}
          <InfoBox heading="For Renters"
           buttonInfo={{
                title: 'Browse Properties',
                link: '/properties',
                backgroundColor: 'bg-black',
           }}
          >
            Find your next home with ease. Browse through our listings to discover properties that suit your needs.
          </InfoBox>

          {/* For Property Owners */}
          <InfoBox heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
                title: 'Add Property',
                link: '/properties/add',
                backgroundColor: 'bg-blue-600',
           }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
