/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlineDateRange } from "react-icons/md";
import {
  useGetAverageCourse,
  useGetBanksLists,
  useGetChart,
} from "../hooks/queries";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiChart, BiLink, BiMailSend, BiPhone } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartType } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const { data: averageCourse } = useGetAverageCourse();
  const { data: banklist } = useGetBanksLists();
  const { data: chart } = useGetChart();
  const [chartData, setChartData] = useState<any>({});
  const average = averageCourse?.results;
  console.log(chart);

  useEffect(() => {
    if (chart && Array.isArray(chart)) {
      const labels = chart.map((item: ChartType) => item.date);
      const buyingValues = chart.map((item: ChartType) =>
        parseInt(item.buying.replace(/\s+/g, ""))
      );
      const sellingValues = chart.map((item: ChartType) =>
        parseInt(item.selling.replace(/\s+/g, ""))
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Sotib olish Narxi",
            data: buyingValues,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
          {
            label: "Sotish Narxi",
            data: sellingValues,
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [chart]);

  return (
    <div className="w-[90%] m-auto py-5 ">
      <h1 className="py-3 text-[24px] font-bold">O'rtacha kurs</h1>
      <div className="p-4 border-1 rounded-lg">
        {average && (
          <div>
            <h1 className="text-[18px] font-medium text-blue-500 flex items-center gap-2">
              <MdOutlineDateRange /> Sana: {average.current_date.split("T")[0]}
            </h1>
            <p className="text-green-600 text-[18px] flex items-center gap-2">
              <FaMoneyBillWave />
              Sotib olish: {average?.average?.buying || "Ma'lumot yo'q"} UZS
            </p>
            <p className="text-red-600 text-[18px] flex items-center gap-2">
              <BiChart /> Sotish: {average?.average?.selling || "Ma'lumot yo'q"}{" "}
              UZS
            </p>
          </div>
        )}
      </div>

      <h1 className="py-3 text-[24px] font-bold text-blue-500">
        Banklar Ro'yxati
      </h1>
      <div className=" w-full grid gap-6">
        {banklist && (
          <div className="w-full grid gap-5">
            <h1 className="text-[20px] font-bold "> Sana: {banklist.date}</h1>

            <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-2">
                {banklist.central_bank.title}
              </h3>

              <div className="flex justify-between mb-4">
                <p className="text-green-600 text-lg md:text-[20px] lg:text-[24px] flex items-center gap-2">
                  <FaMoneyBillWave />
                  Sotib olish: {banklist.central_bank.buying} UZS
                </p>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <BiPhone className="text-gray-600 md:text-[20px] lg:text-[24px]" />
                <a
                  href={`tel:${banklist.central_bank.phone}`}
                  className="text-blue-500 md:text-[20px] lg:text-[24px]"
                >
                  {banklist.central_bank.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <BiMailSend className="text-gray-600 md:text-[20px] lg:text-[24px]" />
                <a
                  href={`mailto:${banklist.central_bank.email}`}
                  className="text-blue-500 md:text-[20px] lg:text-[24px]"
                >
                  {banklist.central_bank.email}
                </a>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <BiLink className="text-gray-600 md:text-[20px] lg:text-[24px]" />
                <a
                  href={banklist.central_bank.website}
                  target="_blank"
                  className="text-blue-500 md:text-[20px] lg:text-[24px]"
                >
                  {banklist.central_bank.website}
                </a>
              </div>

              <p className="text-gray-500 md:text-[20px] lg:text-[24px]">
                Yaratilgan sana:{" "}
                {new Date(
                  banklist.central_bank.created_at
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-[80px]">
              {banklist?.banks?.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-200 flex flex-col gap-5"
                >
                  <h1 className="text-[20px] text-center py-2 font-medium text-gray-900">
                    {item.full_title}
                  </h1>
                  <h1 className="font-medium text-[18px] md:text-[20px] lg:text-[22px] text-blue-600">
                    Yangilangan : {item.updated_at}
                  </h1>
                  <div>
                    <p className="text-green-600 text-lg md:text-[18px] lg:text-[20px] flex items-center gap-2">
                      <FaMoneyBillWave />
                      Sotib olish: {item.buying} UZS
                    </p>

                    <p className="text-red-600 text-lg md:text-[18px] lg:text-[20px] flex items-center gap-2">
                      <FaMoneyBillWave />
                      Sotish: {item.buying} UZS
                    </p>
                  </div>

                  <div>
                    <p className="text-green-600 text-lg md:text-[18px] lg:text-[20px] flex items-center gap-2">
                      <FaMoneyBillWave />
                      Kechagi Xarid: {item.yesterday_buying} UZS
                    </p>

                    <p className="text-red-600 text-lg md:text-[18px] lg:text-[20px] flex items-center gap-2">
                      <FaMoneyBillWave />
                      Kechagi Sotish: {item.yesterday_selling} UZS
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full m-auto py-5 mt-4 lg:mt-7">
        <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg">
          {chartData.labels && chartData.labels.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p className="text-center text-xl">Ma'lumot mavjud emas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
