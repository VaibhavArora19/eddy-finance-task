import { CardDescription, CardHeader, CardTitle } from "../ui/card";

const TransactionCardTitle = (): JSX.Element => {
  return (
    <CardHeader>
      <CardTitle className="text-4xl mt-4">Swap</CardTitle>
      <CardDescription className="text-lg">Swap from any chain to any chain</CardDescription>
    </CardHeader>
  );
};

export default TransactionCardTitle;
