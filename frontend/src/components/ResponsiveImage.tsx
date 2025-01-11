const ResponsiveLanding = ({
  landingImage,
  landingImageMd,
  landingImageSm,
}: any) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={landingImageSm}
        alt="Landing page illustration"
        className="w-full h-full object-cover md:hidden"
      />

      <img
        src={landingImageMd}
        alt="Landing page illustration"
        className="hidden md:block lg:hidden w-full h-full object-cover"
      />

      <img
        src={landingImage}
        alt="Landing page illustration"
        className="hidden lg:block w-full h-full object-cover"
      />
    </div>
  );
};

export default ResponsiveLanding;
