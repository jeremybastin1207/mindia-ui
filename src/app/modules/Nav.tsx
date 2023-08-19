const nav = [
  {
    label: 'Medias library',
    path: '/',
  },
  {
    label: 'Named transformations',
    path: '/named_transformations',
  },
  {
    label: 'Api keys',
    path: '/api_keys',
  },
  {
    label: 'Settings',
    path: '/settings',
  },
];

export const Nav = () => {
  return (
    <ul>
      {nav?.map((item) => (
        <li key={item.label} className="py-2.5 font-semibold text-zinc-600">
          <a href={item.path}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
