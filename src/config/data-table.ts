export type DataTableConfig = typeof dataTableConfig

export const dataTableConfig = {
  comparisonOperators: [
    { label: "Contains", value: "ilike" as const },
    { label: "Does not contain", value: "notIlike" as const },
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "notEq" as const },
    { label: "Starts with", value: "startsWith" as const },
    { label: "Ends with", value: "endsWith" as const },
    { label: "Is empty", value: "isNull" as const },
    { label: "Is not empty", value: "isNotNull" as const },
  ],
  selectableOperators: [
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "notEq" as const },
    { label: "Is empty", value: "isNull" as const },
    { label: "Is not empty", value: "isNotNull" as const },
  ],
  logicalOperators: [
    {
      label: "And",
      value: "and" as const,
      description: "All conditions must be met",
    },
    {
      label: "Or",
      value: "or" as const,
      description: "At least one condition must be met",
    },
  ],
}