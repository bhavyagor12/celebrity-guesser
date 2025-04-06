import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: "walletAddress",
    header: "Wallet Address",
    id: "walletAddress",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "gamesPlayed",
    header: "Games Played",
    id: "gamesPlayed",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "wins",
    header: "Wins",
    id: "wins",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "currentStreak",
    header: "Current Streak",
    id: "currentStreak",
    cell: (info) => info.getValue(),
  },
];

const fetchLeaderboardData = async (currentUserWallet: `0x${string}`) => {
  // let { data: leaderboard, error } = await supabase
  //   .from("leaderboard")
  //   .select("walletAddress, gamesPlayed, wins, currentStreak")
  //   .order("wins", { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leaderboard: any = [];
  const error = null;

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  const currentUserData = leaderboard.find(
    (user) => user.walletAddress === currentUserWallet,
  );
  const otherUsers = leaderboard.filter(
    (user) => user.walletAddress !== currentUserWallet,
  );

  return { currentUserData, otherUsers };
};

const LeaderboardTable = ({
  currentUserWallet,
}: {
  currentUserWallet: `0x${string}`;
}) => {
  const [data, setData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { currentUserData, otherUsers } =
        await fetchLeaderboardData(currentUserWallet);
      setCurrentUserData(currentUserData);
      setData(otherUsers);
    };

    getData();
  }, [currentUserWallet]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {currentUserData && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">Your Stats</h3>
          <p>Wallet Address: {currentUserData.walletAddress}</p>
          <p>Games Played: {currentUserData.gamesPlayed}</p>
          <p>Wins: {currentUserData.wins}</p>
          <p>Current Streak: {currentUserData.currentStreak}</p>
        </div>
      )}

      <Input
        placeholder="Search leaderboard..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.renderCell()}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardTable;
