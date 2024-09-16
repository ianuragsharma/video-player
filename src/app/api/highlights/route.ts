import { mockData } from "@/constant/constant";

export async function GET() {
  return Response.json(mockData);
}
