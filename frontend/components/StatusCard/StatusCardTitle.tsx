import { CardDescription, CardHeader, CardTitle } from "../ui/card";

const StatusCardTitle = () => {
  return (
    <CardHeader>
      <CardTitle className="text-4xl mt-4">Current status</CardTitle>
      <CardDescription className="text-lg">Your transaction status</CardDescription>
    </CardHeader>
  );
};

export default StatusCardTitle;
