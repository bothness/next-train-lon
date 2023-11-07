// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { base } from "$app/paths";
import Rail from "national-rail-darwin";
const rail = new Rail("cc8a687a-8402-4b94-a682-130fe38b0a49");

export async function load({ params }) {
  if (!["out", "rtn"].includes(params.direction)) throw redirect(301, `${base}/out/`);
  const origin = params.direction === "out" ? "SOA" : "WAT";
  const destination = origin === "SOA" ? "WAT" : "SOA";
  const data = await new Promise((resolve) => {
    rail.getDepartureBoardWithDetails(origin, {destination}, (err, result) => {
      resolve(result);
    });
  });
  return data;
}