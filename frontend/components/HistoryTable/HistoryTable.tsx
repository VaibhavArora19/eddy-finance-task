import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { chainIdToImage } from "@/lib/chainIdToImage";
import { TTransactionHistory } from "@/types/transaction";
import Image from "next/image";

export function HistoryTable({ transactions }: { transactions: TTransactionHistory[] }) {
  return (
    <Table className="w-[70%] m-auto mt-[5vh]">
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sender</TableHead>
          <TableHead className="text-center">Recipient</TableHead>
          <TableHead className="text-center">Chains</TableHead>
          <TableHead className="text-center">Tokens</TableHead>
          <TableHead className="text-center">Block</TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.blockNumber}>
            <TableCell className="font-medium">{transaction.sender.substring(0, 6) + "..." + transaction.sender.substring(36, 42)}</TableCell>
            <TableCell className="text-center">{transaction.recipient.substring(0, 6) + "..." + transaction.recipient.substring(36, 42)}</TableCell>
            <TableCell className="flex gap-2 text-center justify-center">
              <Image src={chainIdToImage(+transaction.originChainId).url} alt="chainImage" width={25} height={25} className="" />
              <span>{"->"}</span>
              <Image src={chainIdToImage(+transaction.destinationChainId).url} alt="chainImage" width={25} height={25} />
            </TableCell>
            <TableCell className="text-center">
              {transaction.inputToken.substring(0, 6) +
                "..." +
                transaction.inputToken.substring(36, 42) +
                " -> " +
                transaction.outputToken.substring(0, 6) +
                "..." +
                transaction.outputToken.substring(36, 42)}
            </TableCell>
            <TableCell className="text-center">{transaction.blockNumber}</TableCell>
            <TableCell className="text-center">{transaction.amount + " wei"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
