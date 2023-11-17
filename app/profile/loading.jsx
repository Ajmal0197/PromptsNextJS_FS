import Image from "next/image";
//https://nextjs.org/docs/pages/building-your-application/optimizing/images
// we can also import as component like this or directly use "/loader.png" also
//in below way we need not have to mention width height compulsorily
// import Hero from "public/loader.png";
//  USAGE:
//  <Image src={Hero} alt="" className={styles.img} />

const Loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
};

export default Loading;
