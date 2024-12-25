import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import InputTokenCard from "./InputToken";
import OutputTokenCard from "./OutputTokenCard";
import TransactionCardTitle from "./TransactionCardTitle";
import { IoArrowDownSharp } from "react-icons/io5";

const TransactionCard = () => {
  return (
    <Card className="w-[30rem] m-auto mt-[10rem]">
      <TransactionCardTitle />
      <CardContent>
        <InputTokenCard />
        <div className="flex justify-center mr-12">
          <IoArrowDownSharp className="mb-2 text-3xl text-center" />
        </div>
        <OutputTokenCard />
      </CardContent>
      <CardFooter>
        <Button className="w-[90%] h-[50px] m-auto text-xl">Swap</Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
