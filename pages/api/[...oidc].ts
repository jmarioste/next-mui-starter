// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOidcProvider } from "lib/oidc/Provider";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const oidc = getOidcProvider();

  const originalUrl = req.url;
  req.url = originalUrl.replace("/api/oidc", "");
  const callback = oidc.callback();
  return callback(req, res);
}
