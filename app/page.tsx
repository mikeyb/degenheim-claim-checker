'use client';
import { useEffect, useState } from 'react';
import { getContract } from 'viem';
import { nftAbi } from './abi';
import { publicClient } from './viem';

export default function Home() {
    const [tokenId, setTokenId] = useState('');
    const [isClaimed, setIsClaimed] = useState<boolean | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClaimed(null);
        }, 10000);

        return () => clearTimeout(timer);
    }, [isClaimed]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTokenId(e.target.value);
        setIsClaimed(null);
    };

    return (
        <div className="container">
            <h1 className="text-4xl font-bold pb-10">
                Check if Degenheim NFT is claimed
            </h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter your wallet address"
                    className="input-field"
                    onChange={handleInputChange}
                />
                <button
                    className="check-button"
                    onClick={async () => {
                        const claimedStatus = await checkIfNFTIsClaimed(
                            tokenId
                        );
                        setIsClaimed(claimedStatus as boolean);
                    }}
                >
                    Check
                </button>
                {isClaimed !== null && (
                    <p className="text-2xl font-bold">
                        {isClaimed ? 'NFT is claimed' : 'NFT is not claimed'}
                    </p>
                )}
            </div>
        </div>
    );
}

// create a function to check if the NFT is claimed
async function checkIfNFTIsClaimed(tokenId: string) {
    const nftContract = getContract({
        address: '0x6b27e8d4f299127f62381bb5567f49df43381466',
        abi: nftAbi,
        client: publicClient,
    });

    const isClaimed = await nftContract.read.claimedTokens([tokenId]);
    return isClaimed;
}
