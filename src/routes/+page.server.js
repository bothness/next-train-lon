import Rail from "national-rail-darwin";
const rail = new Rail("cc8a687a-8402-4b94-a682-130fe38b0a49");

export async function load() {
  const data = await new Promise((resolve) => {
    rail.getFastestDepartureWithDetails('SOA', 'WAT', {}, (err, result) => {
      resolve(result);
    });
  });
  return data;
}