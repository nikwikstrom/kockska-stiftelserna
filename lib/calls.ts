import type { Call } from "@/content/site";

export type CallStatus = "kommande" | "oppen" | "stanger-snart" | "stangd";

export function getCallStatus(call: Call, now = new Date()): CallStatus {
  const current = now.getTime();
  const opens = new Date(call.opensAt).getTime();
  const closes = new Date(call.closesAt).getTime();

  if (current < opens) return "kommande";
  if (current >= closes) return "stangd";
  if (closes - current <= 7 * 24 * 60 * 60 * 1000) return "stanger-snart";
  return "oppen";
}

export function getActiveCalls(calls: readonly Call[], now = new Date()) {
  return calls.filter((call) => {
    const status = getCallStatus(call, now);
    return status === "oppen" || status === "stanger-snart";
  });
}
