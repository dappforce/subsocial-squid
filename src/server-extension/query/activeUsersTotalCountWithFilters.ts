export function getActiveUsersTotalCountWithFiltersQuery(
  excludePlaceholders: string,
  includePlaceholders: string
) {
  return `
SELECT COUNT(DISTINCT p.created_by_account_id) AS retention_count
FROM "post" p
JOIN(
  SELECT DISTINCT p2.created_by_account_id
FROM "post" p2
WHERE p2.created_at_time BETWEEN $1 AND $2
${
  excludePlaceholders && excludePlaceholders.length > 0
    ? `
    AND (
      p2.body NOT IN (${excludePlaceholders})
      OR p2.body ILIKE ANY (ARRAY[${includePlaceholders}])
    )`
    : ''
}
    GROUP BY p2.created_by_account_id
    HAVING COUNT(*) >= $3
) subquery ON p.created_by_account_id = subquery.created_by_account_id;
`;
}
