import { InputSearchSort } from "@nosto/nosto-js/client";
import { useLocation } from "preact-iso";
import { useMemo } from "preact/hooks";

export function useParsedSearch() {
  const { query: { filter, page, sort } } = useLocation();
  
  const filters = useMemo(() => {
    if (!filter) return [];
    const fieldMap = new Map<string, { field: string; value: string[] }>();
    filter.split(";").forEach(item => {
      const [field, value] = item.split(":");
      if (field) {
        if (!fieldMap.has(field)) {
          fieldMap.set(field, { field, value: [] });
        }
        fieldMap.get(field)!.value.push(value || "");
      }
    });
    return Array.from(fieldMap.values());
  }, [filter]);

  const currentPage = useMemo(() => Number(page) || 1, [page]);

  const sorting = useMemo(() => {
    if (!sort) return [] as InputSearchSort[];
    return sort.split(";").map(item => {
      const [field, order] = item.split(":");
      return { field, order } as InputSearchSort;
    });
  }, [sort]);

  return { filters, currentPage, sorting };
}