import { useEffect, useRef, useState } from "react";
import { getUsdAmount } from "screens/components/TokenOperations/util";

function useUsdValue(tokenId: string, value?: string, debounce?: number, disabled?: boolean) {
    const [usd, setUsd] = useState("0");
    const [loading, setLoading] = useState(false);
    const debounceMilliseconds = debounce && debounce > 0 ? debounce : 300;
    const timeoutRef = useRef<any>();

    useEffect(() => {
        clearTimeout(timeoutRef.current);

        if (!value || value === "0") {
            setLoading(false);
            setUsd("0");
            return;
        }
        setLoading(true);
        timeoutRef.current = setTimeout(() => {
            (async () => {
                try {
                    let result = parseFloat(await getUsdAmount(tokenId, value, disabled))
                    setUsd(() => {
                        if (result > 1) return result.toFixed(2)
                        else if (result < 0.01) return result.toFixed(6)
                        else return result.toFixed(4)
                    })
                } catch (error) {
                } finally {
                    setLoading(false);
                }
            })();
        }, debounceMilliseconds);
    }, [tokenId, value, debounceMilliseconds]);

    return { usd, loading };
}

export default useUsdValue;
