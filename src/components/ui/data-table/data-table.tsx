import * as React from "react"
import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card"

interface DataTableProps<TData, TValue> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>

  /**
   * The columns of the table.
   * @default []
   * @type ColumnDef<TData, TValue>[]
   * @example columns={[{accessorKey: "flipTrick", header: "Flip Trick", cell: ({row}) => <div>{row.getValue("flipTrick")}</div>}]
   */
  columns: ColumnDef<TData, TValue>[]

  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null
  title?: React.ReactNode

  ref?: React.Ref<HTMLDivElement>
  description?: React.ReactNode
}

export function DataTable<TData, TValue>({
  table,
  columns,
  title = "DataTable",
  description = "Description of the data table.",
  floatingBar = null,
  ref
}: DataTableProps<TData, TValue>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="overflow-auto h-[500px] relative">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-50 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2.5 text-xs text-muted-foreground">
          <DataTablePagination table={table} />
          {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
        </div>
      </CardFooter>
    </Card>
  )
}

