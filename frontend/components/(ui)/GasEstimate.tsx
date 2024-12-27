import { TQuoteResponse } from "@/types/quote";
import { PiGasPumpBold } from "react-icons/pi";

const GasEstimate = ({ quote }: { quote: TQuoteResponse["quote"] | null }) => {
  return (
    <div className="flex justify-between pl-2">
      <div>
        <PiGasPumpBold />
      </div>
      <div className="pr-2">
        <p>{quote ? quote.fees.totalRelayFee.substring(0, 7) : "-"}</p>
      </div>
    </div>
  );
};

export default GasEstimate;
