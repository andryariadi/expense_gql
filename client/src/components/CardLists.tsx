import Card from "./Card";

const CardLists = () => {
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <h3 className="text-5xl font-bold text-center my-10">History</h3>

      {/* Card Lists */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        <Card cardType={"saving"} />
        <Card cardType={"expense"} />
        <Card cardType={"investment"} />
        <Card cardType={"investment"} />
        <Card cardType={"saving"} />
        <Card cardType={"expense"} />
      </div>
    </div>
  );
};
export default CardLists;
