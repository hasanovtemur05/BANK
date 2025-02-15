import { Button, Input, TextField } from "react-aria-components";
import {useAverageCourse,useBestCourses,useCoursesOnBanks2,} from "../hooks/queries";
import { BankType } from "../types";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiMoneyBold } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { useState } from "react";

const Index = () => {
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("bestBuy");
  const [orderBy, setOrderBy] = useState("DESC");
  const { data: kursData } = useBestCourses();
  const { data: ortachaKursData } = useAverageCourse();
  const { data: banksData } = useCoursesOnBanks2(currency, sortBy, orderBy);
  const banks = banksData?.data || []
  console.log(banks);
  

  const buying = kursData?.data?.buying;
  const selling = kursData?.data?.selling;
  const ortachaKurs = ortachaKursData?.results?.average;
  const date = ortachaKursData?.results?.current_date;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Yuklanmoqda...";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
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
            <ul className="mt-2">
              {buying.banks?.map((item: BankType) => (
                <li
                  key={item.id}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <BsBank2 /> {item.name}
                </li>
              ))}
            </ul>
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
            <ul className="mt-2">
              {selling.banks?.map((item: BankType) => (
                <li
                  key={item.id}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <BsBank2 /> {item.name}
                </li>
              ))}
            </ul>
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

      <h2 className="text-2xl font-bold mt-6  text-gray-800">
        Valyuta Konverter
      </h2>
      <div className="flex gap-2 mt-2 lg:mt-5 flex-col md:flex-row">
        <TextField className="border p-2 rounded-md w-1/3">
          <Input
            type="number"
            placeholder="Miqdorni kiriting"
            className="w-full outline-none"
          />
        </TextField>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          🔄 Konvertatsiya qilish
        </Button>
      </div>

      <div className="mt-2 md:mt-4 lg:mt-7">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Banklar bo‘yicha kurslar
        </h1>

        <div className="flex gap-4 mb-4 flex-wrap">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border p-2 rounded-md">
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
      {banks.map((item:{id:number, title:string, logo:string}) => (
        <div key={item.id} className="p-4 border rounded-lg shadow-md bg-gray-100 flex items-center gap-4">
          <img src={item.logo} alt={item.title} className="w-30 object-contain" />
          <h3 className="text-lg font-bold">{item.title}</h3>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default Index;
