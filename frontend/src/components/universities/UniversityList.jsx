import UniversityCard from "./UniversityCard";

const UniversityList = ({ universities = [], onSelect }) => {
  if (!universities.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No universities found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          university={uni}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default UniversityList;
