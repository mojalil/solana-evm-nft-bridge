import { NextResponse, NextRequest } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const QUICKNODE_URI_SOLANA_MAINNET = process.env.QUICKNODE_URI_SOLANA_MAINNET || "";


// Get wallet nfts list
export async function GET(request: NextRequest) {
    const connection = new Connection(QUICKNODE_URI_SOLANA_MAINNET);
    const walletAddress = request.nextUrl.searchParams.get("walletAddress");

    if (!walletAddress) {
        return NextResponse.next();
    }

    const publicKey = new PublicKey(walletAddress);
    const metaplex = new Metaplex(connection);

    const nftData = await metaplex
    .nfts()
    .findAllByOwner({ owner: publicKey });

    console.log("nftData", nftData);

    return new NextResponse(JSON.stringify(nftData), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}
