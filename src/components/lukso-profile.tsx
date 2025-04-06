import { useEffect, useState } from "react";
import { ERC725 } from "@erc725/erc725.js";
import erc725schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { useUpProvider } from "./up-provider";

// Constants for the IPFS gateway and RPC endpoint for the LUKSO testnet
const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs/";
const RPC_ENDPOINT_TESTNET = "https://rpc.testnet.lukso.network";
const RPC_ENDPOINT_MAINNET = "https://rpc.mainnet.lukso.network";

interface LuksoProfileProps {
  address: string;
}

export function LuksoProfile({ address }: LuksoProfileProps) {
  const { chainId } = useUpProvider();
  const [, setProfileData] = useState<{
    imgUrl: string;
    fullName: string;
    background: string;
    profileAddress: string;
    isLoading: boolean;
  }>({
    imgUrl: "https://tools-web-components.pages.dev/images/sample-avatar.jpg",
    fullName: "username",
    background:
      "https://tools-web-components.pages.dev/images/sample-background.jpg",
    profileAddress: "0x1234567890111213141516171819202122232425",
    isLoading: false,
  });

  useEffect(() => {
    async function fetchProfileImage() {
      if (!address) return;

      setProfileData((prev) => ({ ...prev, isLoading: true }));

      try {
        const config = { ipfsGateway: IPFS_GATEWAY };
        const rpcEndpoint =
          chainId === 42 ? RPC_ENDPOINT_MAINNET : RPC_ENDPOINT_TESTNET;
        const profile = new ERC725(erc725schema, address, rpcEndpoint, config);
        const fetchedData = await profile.fetchData("LSP3Profile");

        if (
          fetchedData?.value &&
          typeof fetchedData.value === "object" &&
          "LSP3Profile" in fetchedData.value
        ) {
          const profileImagesIPFS = fetchedData.value.LSP3Profile.profileImage;
          const fullName = fetchedData.value.LSP3Profile.name;
          const profileBackground =
            fetchedData.value.LSP3Profile.backgroundImage;

          setProfileData({
            fullName: fullName || "",
            imgUrl: profileImagesIPFS?.[0]?.url
              ? profileImagesIPFS[0].url.replace("ipfs://", IPFS_GATEWAY)
              : "https://tools-web-components.pages.dev/images/sample-avatar.jpg",
            background: profileBackground?.[0]?.url
              ? profileBackground[0].url.replace("ipfs://", IPFS_GATEWAY)
              : "",
            profileAddress: address,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileData((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    }

    fetchProfileImage();
  }, [address, chainId]);

  return (
    <div>Placeholder for profile info - use in table for leaderboard?</div>
  );
}
