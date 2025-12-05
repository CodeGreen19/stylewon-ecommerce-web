"use client";

import { ChevronRight } from "lucide-react";
import { Heading } from "../shared/heading";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Books",
  "Toys & Games",
  "Automotive",
  "Health",
  "Jewelry",
  "Groceries",
  "Pet Supplies",
  "Baby Products",
  "Office Supplies",
  "Travel",
];

export function HomeCategories() {
  return (
    <section className="mt-10 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Heading className="justify-center">Categories</Heading>

        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-5">
          {categories.map((category, index) => (
            <div
              key={category}
              className="to flex items-center justify-between rounded-sm bg-linear-to-r from-transparent to-cyan-800 p-4"
            >
              <span>{category}</span>
              <ChevronRight size={20} className="text-cyan-300" />
            </div>
          ))}
        </div>

        {categories.length > 8 && (
          <div className="mt-10 text-center sm:hidden">
            <button className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700">
              View all categories
              <ChevronRight className="ml-1 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
