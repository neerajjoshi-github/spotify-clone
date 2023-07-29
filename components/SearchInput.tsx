"use client";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debounceValue, router]);
  return (
    <Input
      placeholder="What do you want to listen today?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
