import { Button, Heading, Input, ListBox, ListBoxItem, TextField, } from "react-aria-components";
import { useAverageCourse, useBestCourses, useCoursesOnBanks2, useGetChart, usepredictions } from "../hooks/queries";
import { useCreateConverter } from "../hooks/mutation";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiMoneyBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { ChartItemType, PredictionType } from "../types";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiChart } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
const queryClient = new QueryClient();

const Index = () => {
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("bestBuy");
  const [orderBy, setOrderBy] = useState("DESC");
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState(31);
  const [code, setCode] = useState("usd");
  const { data: kursData } = useBestCourses();
  const { data: ortachaKursData } = useAverageCourse();
  const { data: banksData } = useCoursesOnBanks2(currency, sortBy, orderBy);
  const { data: prediction } = usepredictions();
  const { data: chart = [] } = useGetChart(count, code) as {
    data: ChartItemType[];
  };
  const { mutate: createMutate } = useCreateConverter();
  const banks = banksData?.data || [];
  const predictionData = prediction?.data || [];
  const buying = kursData?.data?.buying;
  const selling = kursData?.data?.selling;
  const ortachaKurs = ortachaKursData?.results?.average;
  const date = ortachaKursData?.results?.current_date;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(chart.length / itemsPerPage);
  const paginatedData = chart.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "Yuklanmoqda...";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = () => {
    if (!amount) {
      alert("Miqdorni kiriting");
      return;
    }

    const requestData = {
      from_c: "USD",
      to_c: "UZS",
      bank: 0,
      type: "buy" as "buy" | "sell",
      amount: Number(amount),
      currency: currency,
    };

    createMutate(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["converter"] });
        setAmount("");
      },
    });
  };

  return (
    <div className="w-[90%] m-auto py-6 lg:py-8 xl:py-10 flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Eng Yaxshi Kurslar
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buying && (
          <div className="p-4 border rounded-lg shadow-md bg-green-100">
            <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
              <FcMoneyTransfer /> Sotib olish kursi
            </h2>
            <p className="text-lg font-semibold text-gray-700">
              Narx: <span className="text-green-500">{buying.price} UZS</span>
            </p>
          </div>
        )}

        {selling && (
          <div className="p-4 border rounded-lg shadow-md bg-red-100">
            <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
              <PiMoneyBold /> Sotish kursi
            </h2>
            <p className="text-lg font-semibold text-gray-700">
              Narx: <span className="text-red-500">{selling.price} UZS</span>
            </p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-6 text-gray-800">O‘rtacha Kurs</h2>
      <div className="p-4 bg-gray-200 rounded-md w-full">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <MdOutlineDateRange /> Bugungi kun: {formatDate(date)}
        </h1>
        📊{" "}
        {ortachaKurs
          ? `Sotib olish: ${ortachaKurs.buying} UZS | Sotish: ${ortachaKurs.selling} UZS`
          : "Ma'lumot yuklanmoqda..."}
      </div>

      <h2 className="text-2xl font-bold mt-6 text-gray-800">
        Valyuta Konverter
      </h2>
      <div className="flex gap-2 mt-2 lg:mt-5 flex-col md:flex-row">
        <TextField className="border p-2 rounded-md w-[100%] md:w-1/3">
          <Input
            type="number"
            placeholder="Miqdorni kiriting"
            className="w-full outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </TextField>
        <Button
          onPress={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Konvertatsiya qilish
        </Button>
      </div>

      <div className="p-4 border rounded-lg shadow-md w-full mt-2 lg:mt-4 xl:mt-6">
        <Heading
          id="predictions-title"
          className="text-2xl font-bold text-blue-700 mb-3"
        >
          Valyuta Kursi Prognozi
        </Heading>

        {predictionData.length === 0 ? (
          <p className="text-gray-500"> Ma’lumot yo‘q...</p>
        ) : (
          <ListBox className="border p-3 rounded-md bg-white shadow grid md:grid-cols-2 justify-between lg:grid-cols-3">
            {predictionData.map((item: PredictionType, index: number) => (
              <ListBoxItem key={index} textValue={item.currency}>
                <h1 className="px-3 font-bold text-[20px] text-red-500">
                  {item.currency}
                </h1>
                <div className="p-3 border-b last:border-none">
                  <p>
                    <strong>Bugungi kun:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Prognoz kursi:</strong> {item.predicted_rate}{" "}
                    {item.currency}
                  </p>
                  <p>
                    <strong>O‘zgarish foizi:</strong> {item.predicted_change}%
                  </p>
                  <p>
                    {" "}
                    <strong>Status:</strong>
                    <span
                      className={`ml-1 ${
                        item.status === "PENDING"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
              </ListBoxItem>
            ))}
          </ListBox>
        )}
      </div>

      <div className="mt-2 md:mt-4 lg:mt-7">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Banklar bo‘yicha kurslar
        </h1>

        <div className="flex gap-4 mb-4 flex-wrap">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="rub">RUB</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="bestBuy">Eng yaxshi sotib olish</option>
            <option value="bestSell">Eng yaxshi sotish</option>
          </select>

          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="DESC">Kamayish bo‘yicha</option>
            <option value="ASC">O‘sish bo‘yicha</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          {banks.map((item: { id: number; title: string; logo: string }) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-md bg-gray-100 flex items-center gap-4"
            >
              <img
                src={item.logo}
                alt={item.title}
                className="w-30 object-contain"
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 md:mt-7 lg:mt-9">
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border p-2 rounded-md"
        >
          <option value={6}>Oxirgi 6 kun</option>
          <option value={31}>Oxirgi 1 oy</option>
          <option value={180}>Oxirgi 6 oy</option>
          <option value={360}>Oxirgi 1 yil</option>
        </select>

        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded-md mx-4"
        >
          <option value={"usd"}>USD</option>
          <option value={"eur"}>EUR</option>
          <option value={"rub"}>RUB</option>
        </select>

        <div className="py-4">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2"> <AiOutlineLineChart /> Valyuta Tarixi</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
            {paginatedData.map((item, index) => (
              <div key={index} className="border p-3 rounded-md my-2">
                <h2 className="font-bold text-blue-500 flex items-center gap-2">
                  <MdOutlineDateRange /> Sana: {item.date}
                </h2>
                <p className="text-green-600 flex items-center gap-2">
                  <FaMoneyBillWave />
                  Sotib olish: {item.buying} UZS
                </p>
                <p className="text-red-600 flex items-center gap-2">
                  <BiChart /> Sotish: {item.selling} UZS
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅ Oldingi
            </button>

            <span className="font-bold">
              {currentPage} / {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Keyingisi ➡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
