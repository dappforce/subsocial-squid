/**
 * $1 - query_time_from
 * $2 - query_time_to
 * $3 - first_time_range_from
 * $4 - first_time_range_to
 * $5 - second_time_range_from
 * $6 - second_time_range_to
 * $7 - total_min_posts_number
 * $8 - first_range_min_posts_number
 * $9 - last_range_min_posts_number
 */
export function getUserRetentionCountQuery(excludePlaceholders: string) {
  return `
SELECT COUNT(*) AS retention_count
FROM (
    SELECT account.id
    FROM account
    JOIN post ON post.created_by_account_id = account.id
    WHERE
        post.created_at_time >= $1 AND
        post.created_at_time <= $2 
        ${
          excludePlaceholders && excludePlaceholders.length > 0
            ? `
            AND NOT EXISTS (
              SELECT 1
              FROM post
              WHERE
                  post.created_by_account_id = account.id AND
                  post.created_at_time >= $1 AND
                  post.created_at_time <= $2 AND 
                  post.body = ANY (ARRAY[${excludePlaceholders}])
            )
          `
            : ''
        }
    GROUP BY account.id
    HAVING
        COUNT(DISTINCT post.id) > $7 AND
        COUNT(DISTINCT CASE WHEN post.created_at_time >= $3 AND post.created_at_time <= $4 THEN post.id END) >= $8 AND
        COUNT(DISTINCT CASE WHEN post.created_at_time >= $5 AND post.created_at_time <= $6 THEN post.id END) >= $9
) AS subquery;
`;
}
