"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function PageReloader() {
  return (
    <Suspense>
      <PageReloaderCore />
    </Suspense>
  );
}

function PageReloaderCore() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.has("reload")) return;
    const newParams = new URLSearchParams(params);
    newParams.delete("reload");

    const url = `${window.location.pathname}?${newParams.toString()}`;
    window.location.replace(url);
  }, [params, router]);

  return <></>;
}
