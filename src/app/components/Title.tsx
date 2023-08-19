type Props = {
  title: string;
};

export const Title = ({ title }: Props) => (
  <h1 className="mb-12 text-2xl font-bold  text-gray-900">{title}</h1>
);
