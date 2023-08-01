import ContentfulImage from "./contentful-image";

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center" data-sb-field-path="author">
      <div className="relative w-12 h-12 mr-4">
        <ContentfulImage
          src={picture.url}
          layout="fill"
          className="rounded-full"
          alt={name}
          data-sb-field-path=".picture"
        />
      </div>
      <div className="text-xl font-bold" data-sb-field-path=".name">
        {name}
      </div>
    </div>
  );
}
