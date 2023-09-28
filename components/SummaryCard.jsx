import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="shrink-0 grow-0 basis-full md:basis-[calc((100%_-_2rem)/2)] lg:basis-[calc((100%_-_4rem)/3)] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-8 flex flex-wrap justify-between items-center gap-4 rounded-lg">
      <h3 className="text-gray-900 dark:text-white shrink-0 grow-0">{title}</h3>
      <p className="shrink-0 grow-0 text-3xl">{value}</p>
    </div>
  );
};

export default SummaryCard;
