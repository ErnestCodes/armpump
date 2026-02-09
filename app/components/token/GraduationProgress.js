import { ethers } from "ethers";
import ProgressBar from "../ui/ProgressBar";
import { TARGET_ETH, TOKEN_LIMIT } from "../../lib/constants";

export default function GraduationProgress({ sold, raised }) {
  const soldNum = parseFloat(ethers.formatEther(sold));
  const raisedNum = parseFloat(ethers.formatEther(raised));

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-fp-text-dim">ETH Raised</span>
          <span className="text-fp-text font-mono">
            {raisedNum.toFixed(4)} / {TARGET_ETH} ETH
          </span>
        </div>
        <ProgressBar value={raisedNum} max={TARGET_ETH} showLabel={false} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-fp-text-dim">Tokens Sold</span>
          <span className="text-fp-text font-mono">
            {soldNum.toLocaleString()} / {TOKEN_LIMIT.toLocaleString()}
          </span>
        </div>
        <ProgressBar value={soldNum} max={TOKEN_LIMIT} showLabel={false} />
      </div>
      <p className="text-xs text-fp-text-dim text-center">
        Token graduates when either {TARGET_ETH} ETH is raised or{" "}
        {TOKEN_LIMIT.toLocaleString()} tokens are sold. After graduation,
        remaining tokens and raised ETH transfer to the creator.
      </p>
    </div>
  );
}
