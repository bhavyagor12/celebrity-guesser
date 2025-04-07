"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LeaderboardRow = {
  walletAddress: string;
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
};

const mockUser = "0xMyWallet"; // Replace with actual session or wallet logic

const leaderboardData: LeaderboardRow[] = [
  { walletAddress: "0xMyWallet", gamesPlayed: 20, wins: 15, currentStreak: 5 },
  { walletAddress: "0xABC123", gamesPlayed: 18, wins: 12, currentStreak: 3 },
  { walletAddress: "0xDEF456", gamesPlayed: 22, wins: 10, currentStreak: 2 },
  { walletAddress: "0xXYZ789", gamesPlayed: 14, wins: 8, currentStreak: 4 },
  // Add more...
];

const columns: ColumnDef<LeaderboardRow>[] = [
  {
    accessorKey: "walletAddress",
    header: "Wallet Address",
  },
  {
    accessorKey: "gamesPlayed",
    header: "Games Played",
  },
  {
    accessorKey: "wins",
    header: "Wins",
  },
  {
    accessorKey: "currentStreak",
    header: "Current Streak",
  },
];

export default function LeaderboardPage() {
  const [globalFilter, setGlobalFilter] = useState("");

  const sortedData = [
    leaderboardData.find((row) => row.walletAddress === mockUser)!,
    ...leaderboardData.filter((row) => row.walletAddress !== mockUser),
  ];

  const table = useReactTable({
    data: sortedData,
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
      <Input
        placeholder="Search wallet..."
        value={globalFilter}
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={
                  row.original.walletAddress === mockUser
                    ? "bg-yellow-100 font-semibold"
                    : ""
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
