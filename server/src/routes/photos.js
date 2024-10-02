const router = require("express").Router();

module.exports = db => {
  router.get("/photos", (request, response) => {
    // Destructure page and limit from query parameters
    const { page = 1, limit = 10 } = request.query;
    // Convert limit and page to numbers for pagination
    const numericLimit = Number(limit);
    const offset = (Number(page) - 1) * numericLimit;

    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;
    
    console.log(`Fetching photos: page=${page}, limit=${limit}, offset=${offset}`);

    // Query the database
    db.query(
      `
      SELECT json_agg(
        json_build_object(
          'id', photo.id,
          'urls', json_build_object(
            'full', concat($1::text, '/images/', photo.full_url),
            'regular', concat($1::text, '/images/', photo.regular_url)
          ),
          'user', json_build_object(
            'username', user_account.username,
            'name', user_account.fullname,
            'profile', concat($1::text, '/images/', user_account.profile_url)
          ),
          'location', json_build_object(
            'city', photo.city,
            'country', photo.country
          ),
          'similar_photos', (
            SELECT json_agg(
              json_build_object(
                'id', similar_photo.id,
                'urls', json_build_object(
                  'full', concat($1::text, '/images/', similar_photo.full_url),
                  'regular', concat($1::text, '/images/', similar_photo.regular_url)
                ),
                'user', json_build_object(
                  'username', similar_user_account.username,
                  'name', similar_user_account.fullname,
                  'profile', concat($1::text, '/images/', similar_user_account.profile_url)
                ),
                'location', json_build_object(
                  'city', similar_photo.city,
                  'country', similar_photo.country
                )
              )
            )
            FROM photo AS similar_photo
            JOIN user_account AS similar_user_account ON similar_user_account.id = similar_photo.user_id
            WHERE similar_photo.id <> photo.id
            AND similar_photo.topic_id = photo.topic_id
            LIMIT 4
          )
        )
      ) AS photo_data
      FROM photo
      JOIN user_account ON user_account.id = photo.user_id
      LIMIT $2 OFFSET $3;
      `,
      [serverUrl, numericLimit, offset] // Use numericLimit and offset
    )
      .then(({ rows }) => {
        response.json(rows[0].photo_data);
      })
      .catch(error => {
        console.error("Error fetching photos:", error);
        response.status(500).json({ error: "Error fetching photos" });
      });
  });

  return router;
};
