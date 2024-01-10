export function getActiveUsersTotalCountQuery() {
  return `
SELECT
  COUNT(DISTINCT p.created_by_account_id) AS account_count
FROM
  "post" p
WHERE
  p.created_at_time BETWEEN $1 AND $2;`;
}
