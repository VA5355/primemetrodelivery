import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const LogoImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-20%", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={130}
      height={63}
    />
  );
  return (
    <div className="sm:mx-0 mt-5">  {/**  as= /posts/${slug}  href= posts/[slug] */} 
      {slug ? (
        <Link as={`/login`} href="#" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default LogoImage;
