"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterDays() {
  const [days, setDays] = useState("");
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold self-center">Overview</h2>
      <Select value={days} onValueChange={(value) => setDays(value)}>
        <SelectTrigger className="w-[130px] bg-white text-sm font-normal">
          <SelectValue placeholder="Today" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="30days">Last 30days</SelectItem>
          <SelectItem value="14days">Last 14days</SelectItem>
          <SelectItem value="7days">Last 7days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
