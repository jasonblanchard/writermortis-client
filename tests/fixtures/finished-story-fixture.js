export default {
    "pieces": [
        {
            "id": 1,
            "text": "This is the beginning.",
            "created_at": "2014-10-22T00:33:35.283Z",
            "updated_at": "2014-10-22T00:33:35.283Z",
            "user_id": 1
        },
        {
            "id": 2,
            "text": " And this is the end.",
            "created_at": "2014-10-22T00:33:35.283Z",
            "updated_at": "2014-10-22T00:33:35.283Z",
            "user_id": 2
        }
    ],
    "users": [
        {
            "id": 1,
            "email": "jason@example.com",
            "username": "jason"
        },
        {
            "id": 2,
            "email": "lucille@example.com",
            "username": "lucille"
        }
    ],
    "story": {
      "id": 3,
      "title": "A Short Story",
      "total_pieces": 2,
      "max_sentences": 3,
      "piece_ids": [
        1,
        2
      ],
      "user_id": 1
    }
};
