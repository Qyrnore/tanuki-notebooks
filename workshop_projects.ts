import { parse } from "jsr:@std/csv";

export async function calculateBudgets() {
  const TOTAL_BUDGET = 10000000; // 10 million
  const GATHERING_RATIO = 5 / 7;
  const GATHERING_TYPES = ["gc seals", "timed node", "normal"];
  const GATHERING_TYPE_PCTS: Record<string, number> = {
    "gc seals": 0.1,
    "timed node": 0.35,
    normal: 0.55,
  };

  // Load final products and compute crafting contracts
  const finalText = await Deno.readTextFile("utilities/workshop_output.csv");
  const finalRaw = [...parse(finalText)] as string[][];
  const finalProducts = finalRaw
    .map((r) => ({ item: r[0]!, qty: parseFloat(r[1]!) || 0 }))
    .filter((r) => r.qty > 0);
  const totalFinalQty = finalProducts.reduce((sum, r) => sum + r.qty, 0);
  const fullCraftingContracts = finalProducts.map((r) => ({
    item: r.item,
    fullContract: Number((TOTAL_BUDGET * (r.qty / totalFinalQty)).toFixed(2)),
  }));

  // Load gathering list and compute gathering payouts
  const gatherText = await Deno.readTextFile("utilities/gathering_list.csv");
  const gatherRaw = [...parse(gatherText)] as string[][];
  const gatheringRows = gatherRaw.map((r) => ({
    item: r[0]!,
    qty: parseFloat(r[1]!) || 0,
    method: (r[2] || "").trim(),
  }));

  const gatheringBudget = TOTAL_BUDGET * GATHERING_RATIO;
  const sumsByMethod = gatheringRows.reduce((acc, r) => {
    if (GATHERING_TYPES.includes(r.method)) {
      acc[r.method] = (acc[r.method] || 0) + r.qty;
    }
    return acc;
  }, {} as Record<string, number>);

  const gatheringContracts = gatheringRows
    .filter((r) => r.method !== "gc seals")
    .map((r) => {
      if (!GATHERING_TYPES.includes(r.method)) {
        return { item: r.item, gatheringPayout: 0 };
      }
      const share = GATHERING_TYPE_PCTS[r.method];
      const pool = sumsByMethod[r.method] || 1;
      const amt = gatheringBudget * share * (r.qty / pool);
      return { item: r.item, gatheringPayout: Number(amt.toFixed(2)) };
    })
    .filter((r) => r.gatheringPayout > 0);

  console.log("— Full 7/7 Crafting Contracts —");
  console.table(fullCraftingContracts);

  console.log("— 5/7 Gathering Payouts (excl. gc seals) —");
  console.table(gatheringContracts);

  const normalGatheringBudget = gatheringBudget * GATHERING_TYPE_PCTS["normal"];
  console.log(
    "— Total 5/7 budget for normal gathering:",
    normalGatheringBudget.toFixed(2)
  );

  const timedNodeBudget = gatheringBudget * GATHERING_TYPE_PCTS["timed node"];
  console.log(
    "— Total 5/7 budget for timed nodes:",
    timedNodeBudget.toFixed(2)
  );

  const gcSealsBudget = gatheringBudget * GATHERING_TYPE_PCTS["gc seals"];
  console.log(
    "— Total 5/7 budget for gc seals mats:",
    gcSealsBudget.toFixed(2)
  );

  const craftingBudget = TOTAL_BUDGET - gatheringBudget;
  console.log(
    "— Total 2/7 budget for crafting:",
    craftingBudget.toFixed(2)
  );

  const checkBudgets = craftingBudget + normalGatheringBudget + timedNodeBudget + gcSealsBudget;
  console.log(
    "— Check total budgets:",
    checkBudgets.toFixed(2),
  )
  
  return {
    fullCraftingContracts,
    gatheringContracts,
    normalGatheringBudget,
    timedNodeBudget,
    gcSealsBudget,
    craftingBudget
  };
}
