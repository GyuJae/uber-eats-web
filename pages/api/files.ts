// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type IResponse = {
  ok: boolean;
  error?: string;
  url?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          },
        }
      )
    ).json();
    return res.status(200).json({
      ok: true,
      ...response.result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}
