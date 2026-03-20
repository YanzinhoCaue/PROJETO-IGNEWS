import { Client } from "faunadb";

const faunaKey = process.env.FAUNADB_KEY;
export const fauna = faunaKey
  ? new Client({
      secret: faunaKey,
    })
  : null;

export function getFaunaClient() {
  if (!fauna) {
    throw new Error("FAUNADB_KEY is not configured");
  }

  return fauna;
}