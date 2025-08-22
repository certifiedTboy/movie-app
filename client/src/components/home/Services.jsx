import ServicesCard from "./ServicesCard";

const Services = () => {
  return (
    <section className="bg-[#0f172a] p-6 my-[30px] shadow-lg">
      <h1 className="text-center my-[30px] text-2xl text-[#fff] font-semibold">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <ServicesCard />
        <ServicesCard />
        <ServicesCard />
        <ServicesCard />
      </div>
    </section>
  );
};

export default Services;
